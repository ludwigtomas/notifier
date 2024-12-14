<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        $schedule->command('gitlab:repositories-sync')->dailyAt('00:00');
        $schedule->command('google:analytics')->monthlyOn(2, '04:00');
        // $schedule->command('telescope:prune --hours=48')->daily();
        $schedule->command('database:backup')->dailyAt('01:00');
        $schedule->command('repository-file:command')->dailyAt('02:00');
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
