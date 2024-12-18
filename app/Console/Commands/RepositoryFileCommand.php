<?php

namespace App\Console\Commands;

use App\Enums\RepositorySetting\RepositorySettingKeyEnum;
use App\Enums\RepositorySetting\RepositorySettingValueEnum;
use App\Models\Repository;
use App\Models\RepositorySetting;
use DateInterval;
use Exception;
use GuzzleHttp\Client;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use InvalidArgumentException;

class RepositoryFileCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'repository-file:command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $repositories = Repository::query()
            ->with('repositorySettings')
            ->orderBy('last_commit_at', 'desc')
            ->get();

        foreach ($repositories as $repository) {

            Log::channel('backup')->info("Processing repository: {$repository->name}");

            foreach ($repository->repositorySettings as $setting) {
                Log::channel('backup')->info("Processing setting: {$setting->key->name}");
                $this->shouldSendRequest($setting) ? $this->sendPostRequest($repository, $setting) : null;
            }
        }
    }

    private static function shouldSendRequest(RepositorySetting $repository_setting): bool
    {
        // if ( ! $repository_setting->was_successful) return false;

        $last_attempt_at = Carbon::parse($repository_setting->last_attempt_at);

        $interval = self::convertInterval($repository_setting->value);

        return $last_attempt_at->add($interval)->isPast();
    }

    private static function convertInterval(RepositorySettingValueEnum $value): DateInterval
    {
        return match ($value) {
            RepositorySettingValueEnum::DAILY => new DateInterval('P1D'),
            RepositorySettingValueEnum::WEEKLY => new DateInterval('P1W'),
            RepositorySettingValueEnum::MONTHLY => new DateInterval('P1M'),
            default => throw new InvalidArgumentException("Invalid interval value: {$value}"),
        };
    }

    private static function sendPostRequest(
        Repository $repository,
        RepositorySetting $setting,
    ): void {
        try {
            $client = new Client;

            $url = $repository->website_url.'api/backup';

            $param_type = match ($setting->key) {
                RepositorySettingKeyEnum::BACKUP_DATABASE => RepositorySettingKeyEnum::BACKUP_DATABASE->value,
                RepositorySettingKeyEnum::BACKUP_STORAGE => RepositorySettingKeyEnum::BACKUP_STORAGE->value,
                default => throw new InvalidArgumentException("Invalid repository file type: {$setting->type}"),
            };

            $response = $client->get($url, [
                'query' => [
                    'param' => $param_type,
                ],
            ]);

            $data = $response->getBody()->getContents();

            Log::info("POST request to {$repository->website_url} was successful. Response: ".$response->getBody());
        } catch (Exception $e) {
            Log::error("POST request to {$repository->website_url} failed. Error: ".$e->getMessage());
        }
    }
}
