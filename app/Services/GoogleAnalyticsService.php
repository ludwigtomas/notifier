<?php

namespace App\Services;

use App\Mail\GoogleAnalyticsMail;
use App\Models\Repository;
use App\Notifications\GoogleAnalyticsNotification;
use Carbon\Carbon;
use Google\Analytics\Data\V1beta\BetaAnalyticsDataClient;
use Google\Analytics\Data\V1beta\DateRange;
use Google\Analytics\Data\V1beta\Dimension;
use Google\Analytics\Data\V1beta\Metric;
use Illuminate\Support\Facades\Mail;

class GoogleAnalyticsService
{
    public static function googleAnalyticsForRepositories()
    {
        $repositories = Repository::query()
            ->whereNotNull('analytics_property_id')
            ->get();

        foreach ($repositories as $repository) {
            self::googleAnalyticsForRepository($repository);

            $repository->notify(new GoogleAnalyticsNotification($repository));
        }
    }

    public static function googleAnalyticsForRepository(Repository $repository)
    {
        $current_month = self::currentMonthStats($repository->analytics_property_id);

        $previous_month = self::previousMonthStats($repository->analytics_property_id);

        $percentage = ($current_month['visitors'] - $previous_month['visitors']) / $previous_month['visitors'] * 100;

        $compare = [
            'current_month' => $current_month,
            'previous_month' => $previous_month,
            'visit_percentage' => number_format($percentage, 2),
            'visit_percentage_color' => $percentage >= 0 ? 'green' : 'red',
            'visit_difference' => $current_month['visitors'] - $previous_month['visitors'],
        ];

        $clients = $repository->clients;

        foreach ($clients as $client) {
            Mail::to($client->pivot->client_email ?? $client->email)->send(new GoogleAnalyticsMail(
                $repository,
                $compare,
                $client,
            ));
        }
    }

    private static function currentMonthStats(?string $analytic_id = null)
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

    private static function previousMonthStats(?string $analytic_id = null)
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
