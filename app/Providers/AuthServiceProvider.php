<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use App\Models\User;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        if (app()->isProduction()) {
            Gate::define('viewPulse', fn(User $user) => in_array($user->email, [
                'info@ludwigtomas.cz',
            ]));

            Gate::define('viewLogViewer', fn(User $user) => in_array($user->email, [
                'info@ludwigtomas.cz',
            ]));

            Gate::define('viewHorizon', fn(User $user) => in_array($user->email, [
                'info@ludwigtomas.cz',
            ]));

            Gate::define('viewTelescope', fn(User $user) => in_array($user->email, [
                'info@ludwigtomas.cz',
            ]));
        }
    }
}
