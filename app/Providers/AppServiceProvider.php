<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Laravel\Telescope\Telescope;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void {}

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Telescope::night();
        Model::shouldBeStrict();
        JsonResource::withoutWrapping();
        Vite::usePrefetchStrategy('aggressive');

        if (app()->isLocal()) {
            Model::preventLazyLoading();
        }

        if (app()->isProduction()) {
            $this->app['request']->server->set('HTTPS', true);
            DB::prohibitDestructiveCommands();
        }
    }
}
