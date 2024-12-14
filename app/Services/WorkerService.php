<?php

namespace App\Services;

use App\Models\Repository;
use App\Models\Worker;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class WorkerService
{
    private Worker $worker;

    private const PING_URI = '/api/ping';
    private const COMMAND_URI = '/api/command';
    private const STATUS_URI = '/api/queue';
    private const CONTAINERS_URI = '/api/containers';

    public function __construct(Worker $worker)
    {
        $this->worker = $worker;
    }

    /**
     * Pings the worker.
     * @return bool
     */
    public function ping(): bool
    {
        try {
            return Http::withHeaders([
                'Authorization' => $this->worker->token,
            ])->get($this->worker->url.self::PING_URI)->ok();
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Executes a command on the worker.
     * @param string $command
     * @param array<int, string> $arguments
     * @return bool
     */

    public function command(string $command, array $arguments = []): bool
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => $this->worker->token,
            ])->post($this->worker->url.self::COMMAND_URI, [
                'command' => $command,
                'args' => $arguments,
            ]);

            return $response->ok();
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Retrieves the worker status.
     * @return array
     */
    public function status(): array
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => $this->worker->token,
            ])->get($this->worker->url.self::STATUS_URI);

            return $response->json();
        } catch (\Exception $e) {
            return [];
        }
    }

    /**
     * Deploys a repository.
     * @param Repository $repository
     * @return bool
     */
    public function deployRepository(Repository $repository): bool
    {
        try {
            // Slug is not correct here, so have to explode the string
            $arg1 = explode('devuni2/', $repository->repository_url)[1];
            $arg2 = $repository->name;

            return $this->command('deploy', [$arg1, $arg2]);
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Retrieves the list of containers.
     * @return array
     */
    public function containers(): array
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => $this->worker->token,
            ])->get($this->worker->url.self::CONTAINERS_URI);

            return $response->json();
        } catch (\Exception $e) {
            return [];
        }
    }
}
