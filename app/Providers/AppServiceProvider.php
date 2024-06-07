<?php

namespace App\Providers;

use App\Models\Repository;
use App\Observers\RepositoryObserver;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\ServiceProvider;
use Opcodes\LogViewer\Facades\LogViewer;
use Illuminate\Http\Resources\Json\JsonResource;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Model::shouldBeStrict(!app()->isProduction());

        JsonResource::withoutWrapping();

        if (app()->isProduction()) {
            $this->app['request']->server->set('HTTPS', true);
        }
    }
}
