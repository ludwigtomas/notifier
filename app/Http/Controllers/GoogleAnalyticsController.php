<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Repository;
use Illuminate\Mail\Markdown;
use Google\Analytics\Data\V1beta\Metric;
use Google\Analytics\Data\V1beta\DateRange;
use Google\Analytics\Data\V1beta\Dimension;
use Google\Analytics\Data\V1beta\BetaAnalyticsDataClient;

class GoogleAnalyticsController extends Controller
{
    public function googleAnalytics(Repository $repository)
    {
        $current_month = $this->googleAnalyticsCurrentMonth($repository->analytics_property_id);

        $previous_month = $this->googleAnalyticsPreviousMonth($repository->analytics_property_id);

        $percentage = ($current_month['visitors'] - $previous_month['visitors']) / $previous_month['visitors'] * 100;

        $compare = [
            'current_month' => $current_month,
            'previous_month' => $previous_month,
            'visit_percentage' => number_format($percentage, 2),
            'visit_percentage_color' => $percentage > 0 ? 'green' : 'red',
            'visit_difference' => $current_month['visitors'] - $previous_month['visitors'],
        ];

        $markdown = new Markdown(view(), config('mail.markdown'));

        return $markdown->render('mail.google.google_analytics', [
            'data' => $compare,
        ]);


        // $client = new BetaAnalyticsDataClient();

        // $dateRange = new DateRange([
        //     'start_date' => Carbon::now()->startOfMonth()->toDateString(),
        //     'end_date' => Carbon::now()->toDateString(),
        // ]);

        // $dimension = new Dimension([
        //     'name' => 'city',
        // ]);

        // $metric = new Metric([
        //     'name' => 'activeUsers',
        // ]);

        // $response = $client->runReport([
        //     'property' => 'properties/372921775',
        //     'dateRanges' => [$dateRange],
        //     'dimensions' => [$dimension],
        //     'metrics' => [$metric],
        // ]);

        // $response = $response->getRows();

        // $data = [
        //     'metric' => [],
        //     'most_visited_cities' => [],
        //     'visitors' => 0,
        //     'month' => '',
        // ];

        // foreach ($response as $key => $value) {
        //     $array_key = $value->getDimensionValues()[0]->getValue();

        //     $data['metric'][$array_key] = $value->getMetricValues()[0]->getValue();

        //     // get five the most visited cities
        //     if ($key < 5) {
        //         $data['most_visited_cities'][] = $value->getDimensionValues()[0]->getValue();
        //     }

        //     $data['visitors'] += $value->getMetricValues()[0]->getValue();
        // }

        // dd($data);


        // $markdown = new Markdown(view(), config('mail.markdown'));
        // $data = $response;

        // return $markdown->render('mail.google.google_analytics', [
        //     'data' => $data,
        // ]);
    }

    private function googleAnalyticsCurrentMonth(string $analytic_id = null)
    {
        $client = new BetaAnalyticsDataClient();

        $dateRange = new DateRange([
            'start_date' => Carbon::now()->startOfMonth()->toDateString(),
            'end_date' => Carbon::now()->toDateString(),
        ]);

        $dimension = new Dimension([
            'name' => 'city',
        ]);

        $metric = new Metric([
            'name' => 'activeUsers',
        ]);

        $response = $client->runReport([
            'property' => 'properties/'. $analytic_id,
            'dateRanges' => [$dateRange],
            'dimensions' => [$dimension],
            'metrics' => [$metric],
        ]);

        $response = $response->getRows();

        $data = [
            'metric' => [],
            'most_visited_cities' => [],
            'visitors' => 0,
            'month' => Carbon::now()->translatedFormat('F'),
        ];

        foreach ($response as $key => $value) {
            $array_key = $value->getDimensionValues()[0]->getValue() != '(not set)' ? $value->getDimensionValues()[0]->getValue() : 'Unknown';

            $data['metric'][$array_key] = $value->getMetricValues()[0]->getValue();

            // get five the most visited cities
            if ($key < 5) {
                $data['most_visited_cities'][] = $value->getDimensionValues()[0]->getValue() != '(not set)' ? $value->getDimensionValues()[0]->getValue() : 'Unknown';
            }

            $data['visitors'] += $value->getMetricValues()[0]->getValue();
        }

        return $data;
    }

    private function googleAnalyticsPreviousMonth(string $analytic_id = null)
    {
        $client = new BetaAnalyticsDataClient();

        $dateRange = new DateRange([
            'start_date' => Carbon::now()->subMonth()->startOfMonth()->toDateString(),
            'end_date' => Carbon::now()->subMonth()->endOfMonth()->toDateString(),
        ]);

        $dimension = new Dimension([
            'name' => 'city',
        ]);

        $metric = new Metric([
            'name' => 'activeUsers',
        ]);

        $response = $client->runReport([
            'property' => 'properties/'. $analytic_id,
            'dateRanges' => [$dateRange],
            'dimensions' => [$dimension],
            'metrics' => [$metric],
        ]);

        $response = $response->getRows();

        $data = [
            'metric' => [],
            'most_visited_cities' => [],
            'visitors' => 0,
            'month' => Carbon::now()->subMonth()->translatedFormat('F'),
        ];

        foreach ($response as $key => $value) {
            $array_key = $value->getDimensionValues()[0]->getValue() != '(not set)' ? $value->getDimensionValues()[0]->getValue() : 'Unknown';

            $data['metric'][$array_key] = $value->getMetricValues()[0]->getValue();

            // get five the most visited cities
            if ($key < 5) {
                $data['most_visited_cities'][] = $value->getDimensionValues()[0]->getValue() != '(not set)' ? $value->getDimensionValues()[0]->getValue() : 'Unknown';
            }

            $data['visitors'] += $value->getMetricValues()[0]->getValue();
        }

        return $data;
    }
}
