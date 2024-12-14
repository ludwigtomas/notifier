<?php

namespace App\Http\Controllers;

use App\Enums\RepositorySetting\RepositorySettingKeyEnum;
use App\Enums\RepositorySetting\RepositorySettingValueEnum;
use App\Http\Requests\StoreRepositorySettingRequest;
use App\Http\Requests\UpdateRepositorySettingRequest;
use App\Http\Resources\RepositoryResource;
use App\Http\Resources\RepositorySettingShowResource;
use App\Models\Repository;
use App\Models\RepositorySetting;
use Carbon\Carbon;

class RepositorySettingController extends Controller
{
    public function create(Repository $repository)
    {
        return inertia('RepositorySettings/Create', [
            'repository' => $repository,
            'option_keys' => RepositorySettingKeyEnum::cases(),
            'option_values' => RepositorySettingValueEnum::cases(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Repository $repository, StoreRepositorySettingRequest $request)
    {
        // Check if the repository already has a setting with the same key
        if ($repository->repositorySettings()->where('key', $request->key)->exists()) {
            return back()->withErrors(['key' => 'Klíč již existuje']);
        }

        $repository->repositorySettings()->create($request->validated());

        return to_route('repositories.edit', $repository);

    }

    /**
     * Display the specified resource.
     */
    public function show(RepositorySetting $repositorySetting): void {}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Repository $repository, RepositorySetting $repository_setting)
    {
        return inertia('RepositorySettings/Edit', [
            'repository' => new RepositoryResource($repository->load('hostingRepository')),
            'repository_setting' => new RepositorySettingShowResource($repository_setting),
            'option_keys' => RepositorySettingKeyEnum::cases(),
            'option_values' => RepositorySettingValueEnum::cases(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRepositorySettingRequest $request, RepositorySetting $repository_setting): void
    {
        $repository_setting->update([
            'key' => $request->key,
            'value' => $request->value,
            'is_active' => $request->is_active,
            'last_attempt_at' => Carbon::parse($request->last_attempt_at)->format('Y-m-d H:i:s'),
            'attempts' => $request->attempts,
            'was_successful' => $request->was_successful,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RepositorySetting $repositorySetting): void {}
}
