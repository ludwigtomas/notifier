<?php

namespace App\Http\Controllers;

use App\Models\Repository;
use Carbon\Carbon;
use Google\Analytics\Data\V1beta\BetaAnalyticsDataClient;
use Google\Analytics\Data\V1beta\DateRange;
use Google\Analytics\Data\V1beta\Dimension;
use Google\Analytics\Data\V1beta\Metric;
use Illuminate\Mail\Markdown;

class GoogleAnalyticsController extends Controller
{
    public function googleAnalytics(Repository $repository)
    {
        $current_month = $this->currentMonthStats($repository->analytics_property_id);

        $previous_month = $this->previousMonthStats($repository->analytics_property_id);

        $percentage = ($current_month['visitors'] - $previous_month['visitors']) / $previous_month['visitors'] * 100;

        $compare = [
            'current_month' => $current_month,
            'previous_month' => $previous_month,
            'visit_percentage' => number_format($percentage, 2),
            'visit_percentage_color' => $percentage >= 0 ? 'green' : 'red',
            'visit_difference' => $current_month['visitors'] - $previous_month['visitors'],
        ];

        $markdown = new Markdown(view(), config('mail.markdown'));

        return $markdown->render('mail.google.google_analytics', [
            'data' => $compare,
            'repository' => $repository,
        ]);
    }

    private function currentMonthStats(?string $analytic_id = null)
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
            'property' => 'properties/'.$analytic_id,
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
            $array_key = $value->getDimensionValues()[0]->getValue() != '(not set)' ? $value->getDimensionValues()[0]->getValue() : '---';

            $data['metric'][$array_key] = $value->getMetricValues()[0]->getValue();

            // get five the most visited cities
            if ($key < 4) {
                $data['most_visited_cities'][] = $value->getDimensionValues()[0]->getValue() != '(not set)' ? $value->getDimensionValues()[0]->getValue() : '---';
            }

            $data['visitors'] += $value->getMetricValues()[0]->getValue();
        }

        return $data;

    }

    private function previousMonthStats(?string $analytic_id = null)
    {
        $client = new BetaAnalyticsDataClient();

        $dateRange = new DateRange([
            'start_date' => Carbon::now()->subMonthNoOverflow()->startOfMonth()->toDateString(),
            'end_date' => Carbon::now()->subMonthNoOverflow()->endOfMonth()->toDateString(),
        ]);

        $dimension = new Dimension([
            'name' => 'city',
        ]);

        $metric = new Metric([
            'name' => 'activeUsers',
        ]);

        $response = $client->runReport([
            'property' => 'properties/'.$analytic_id,
            'dateRanges' => [$dateRange],
            'dimensions' => [$dimension],
            'metrics' => [$metric],
        ]);

        $response = $response->getRows();

        $data = [
            'metric' => [],
            'most_visited_cities' => [],
            'visitors' => 0,
            'month' => Carbon::now()->subMonthNoOverflow()->translatedFormat('F'),
        ];

        foreach ($response as $key => $value) {
            $array_key = $value->getDimensionValues()[0]->getValue() != '(not set)' ? $value->getDimensionValues()[0]->getValue() : '---';

            $data['metric'][$array_key] = $value->getMetricValues()[0]->getValue();

            // get five the most visited cities
            if ($key < 4) {
                $data['most_visited_cities'][] = $value->getDimensionValues()[0]->getValue() != '(not set)' ? $value->getDimensionValues()[0]->getValue() : '---';
            }

            $data['visitors'] += $value->getMetricValues()[0]->getValue();
        }

        return $data;
    }
}
