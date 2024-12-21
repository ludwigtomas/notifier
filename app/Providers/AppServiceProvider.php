<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Resources\Json\JsonResource;
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

        Model::shouldBeStrict( ! app()->isProduction());

        JsonResource::withoutWrapping();

        app()->isProduction()
            ? $this->app['request']->server->set('HTTPS', true)
            : null;
    }
}
