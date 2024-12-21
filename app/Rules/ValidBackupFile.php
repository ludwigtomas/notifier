<?php

namespace App\Rules;

use App\Enums\RepositorySetting\RepositorySettingKeyEnum;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\Log;

class ValidBackupFile implements ValidationRule
{
    protected $backup_type;

    public function __construct($backup_type)
    {
        $this->backup_type = $backup_type;
    }

    /**
     * Run the validation rule.
     *
     * @param  Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $extension = $value->getClientOriginalExtension();

        // Debug statements
        Log::info("Validating backup file: {$attribute}, Type: {$this->backup_type}, Extension: {$extension}");

        if ($this->backup_type === RepositorySettingKeyEnum::BACKUP_DATABASE->value && 'sql' !== $extension) {
            Log::info('Validation failed: Expected .sql file for database backups.');
            $fail('The backup file must be a .sql file for database backups.');
        }

        if ($this->backup_type === RepositorySettingKeyEnum::BACKUP_STORAGE->value && 'zip' !== $extension) {
            Log::info('Validation failed: Expected .zip file for storage backups.');
            $fail('The backup file must be a .zip file for storage backups.');
        }
    }
}
