<div align="center">
    <h1>The Notifier</h1>
    <a href="https://ludwigtomas.cz/">
        odkaz na web
    </a>
</div>

### :notebook_with_decorative_cover: Summary

-   [Description](#point_right-description)
-   [Frameworks](#point_right-frameworks)
-   [Requirements](#point_right-requirements)
-   [Important](#point_right-important)
-   [Packages](#point_right-packages)
    -   [Composer](#composer)
    -   [NPM](#npm)
-   [Project setup](#point_right-project-setup)
    -   [Clone project](#clone-project)
    -   [Setup ENV file](#setup-env-file)
    -   [Start project](#point_right-start-project)
    -   [Google Credentials](#point_right-google-credentials)
-   [Supervisor setup](#point_right-supervisor-setup)
    -   [Supervisor config](#point_right-supervisor-config)
    -   [Supervisor start](#point_right-supervisor-start)
-   [SSH connection](#point_right-ssh-connection)

## :point_right: Description

The main purpose of this website is:
-  [Database structure](https://drawsql.app/teams/bubakvoe/diagrams/notifier)
-   Sync repositories from Gitlab ( ✅ )
-   connect via SSH connection to VPS (IP, Port, username, password) ( ✅)
-   send daily notifications to the client/clients if on their website is a new commit ( ✅ )
-   send monthly reports to the client/clients from Google Analytics ( ✅ )
-   store daily database backups for repositories ( ✅ )
-   store weekly storage backups for repositories (🛠️ in progress)

## :point_right: Frameworks

-   Laravel 11.x
-   InertiaJS
-   ReactJS
-   MySQL
-   TailwindCSS 3.x

## :point_right: Requirements

-   PHP 8.3
-   Git
-   Composer
-   MySQL
-   Npm
-   Node
-   Redis
-   Supervisor

## :point_right: Important

-   **Supervisor** - for running queue, scheduler, pulse, etc.
-   **Redis** - for storing cache, sessions
-   **SSH connection** - for connecting to VPS
-   **Google Cloud Platform** - for monthly reports from Google Analytics
-   **php pcntl** (extension for running queue - Horizon)

## :point_right: Packages

### Composer

-   [Google Analytics Data API](https://github.com/googleapis/php-analytics-data)
-   [Guzzle HTTP](https://docs.guzzlephp.org/en/stable/)
-   [Inertia](https://inertiajs.com/)
-   [Laravel Breeze](https://laravel.com/docs/11.x/starter-kits#breeze-and-inertia)
-   [Laravel Horizon](https://laravel.com/docs/11.x/horizon)
-   [Laravel Pulse](https://laravel.com/docs/11.x/pulse)
-   [LogViewer](https://log-viewer.opcodes.io/)
-   [Predis/Predis](https://github.com/predis/predis)
-   [Ziggy](https://github.com/tighten/ziggy)
-   [Laravel debugbar](https://github.com/barryvdh/laravel-debugbar)

### NPM

-   [Axios](https://axios-http.com/)
-   [Headless UI](https://headlessui.com/)
-   [Heroicons](https://heroicons.com/)
-   [Lodash](https://lodash.com/)
-   [Framer Motion](https://www.framer.com/motion/)
-   [Xterm.js](https://xtermjs.org/)
-   [Socket.io](https://socket.io/)
-   [Express](https://expressjs.com/)
-   [SSH2](https://github.com/mscdex/ssh2)

## :point_right: Project setup

### Clone project

```sh
git clone https://gitlab.com/bubak1/portfolio/the-notifier.git
```

```sh
cd The-notifier
```

### Setup ENV file

-   Copy .env.example file and create .env file

```sh
cp .env.example .env
```

-   open .env file

```sh
APP_NAME=Notifier
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=

LOG_CHANNEL=daily
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"
```

#### `APP_NAME` (required - string)

-   name of project

#### `APP_ENV` (required - local, production)

-   local for local development
-   production for production build

#### `APP_DEBUG` (required - true, false)

-   true for local development
-   false for production

#### `APP_URL` (required - localhost, domain url)

-   local development -> localhost / 127.0.0.1
-   production -> domain url (for example: `APP_URL=https://ludwigtomas.cz/`)

#### `LOG_CHANNEL` (required - stack, daily)

-   stack - create laravel.log and all logs are logged here
-   daily - creates laravel.log depending on date (`laravel-2023-12-14.log`, `laravel-2023-12-15.log`, `laravel-2023-12-16.log`)

#### `DB_CONNECTION` (required - mysql)

#### `DB_HOST` (required)

#### `DB_PORT` (required)

#### `DB_DATABASE` (required)

#### `DB_USERNAME` (required)

#### `DB_PASSWORD` (required)

<br>

## :point_right: Start project

```sh
composer i
```

```sh
npm i
```

```sh
php artisan key:generate
```

```sh
php artisan storage:link
```

```sh
php artisan migrate --seed
```

```sh
php artisan serve
```

```sh
php run dev
```

## :point_right: Google Credentials

-   for monthly Google Analytics reports you need to create new project in Google Cloud Platform
-   then you need to create new service account and download the credentials
-   then you need to rename the credentials to `credentials.json` and move it somewhere in your local machine / VPS
-   then you need to update the path to the credentials in the `.env` file

```sh
GOOGLE_APPLICATION_CREDENTIALS=/path/to/credentials.json
```

## :point_right: Supervisor setup

There are 4 different processes that need to be run by supervisor

-   <b>laravel_horizon</b> - for managing queues
-   <b>pulse_check</b> - check VPS status (Ram, CPU, Disk, etc.)
-   <b>pulse_work</b> - for showing visual representation of the data
-   <b>schedule_work</b> - for running scheduler

<br>

-   First you need to install supervisor

```sh
apt install supervisor
```

-   Usual path to supervisor config file is

```sh
cd /etc/supervisor/conf.d/
```

-   Then you need to create new file with <b>.conf</b> extension and paste the following code
-   So for example lets create new file called <b>notifier.conf</b> (becase of the project name)

```sh
nano notifier.conf
```

-   paste the following <b>config</b>

<br>

## :point_right: Supervisor config

-   ⚠️ <code>important - change the path to your project path</code> ⚠️

```sh
[group:notifier]
programs=laravel_horizon,pulse_check,pulse_work, schedule_work, queue_work

[program:laravel_horizon]
process_name=%(program_name)s
command=php /var/www/html/artisan horizon
directory=/var/www/html
autostart=true
autorestart=true
user=www-data
stopwaitsecs=3600
stderr_logfile=/var/www/html/storage/logs/horizon.log
stdout_logfile=/var/www/html/storage/logs/horizon.log

[program:pulse_check]
process_name=%(program_name)s
command=php /var/www/html/artisan pulse:check
directory=/var/www/html
autostart=true
autorestart=true
user=www-data
stopwaitsecs=3600
stderr_logfile=/var/www/html/storage/logs/pulse.log
stdout_logfile=/var/www/html/storage/logs/pulse.log

[program:pulse_work]
process_name=%(program_name)s
command=php /var/www/html/artisan pulse:work
directory=/var/www/html
autostart=true
autorestart=true
user=www-data
stopwaitsecs=3600
stderr_logfile=/var/www/html/storage/logs/pulse.log
stdout_logfile=/var/www/html/storage/logs/pulse.log

[program:schedule_work]
process_name=%(program_name)s
command=php /var/www/html/artisan schedule:work
directory=/var/www/html
autostart=true
autorestart=true
user=www-data
stopwaitsecs=3600
stderr_logfile=/var/www/html/storage/logs/schedule_work.log
stdout_logfile=/var/www/html/storage/logs/schedule_work.log

[program:queue_work]
process_name=%(program_name)s
command=php /var/www/html/artisan queue:work
directory=/var/www/html
autostart=true
autorestart=true
user=www-data
stopwaitsecs=3600
stderr_logfile=/var/www/html/storage/logs/queue_work.log
stdout_logfile=/var/www/html/storage/logs/queue_work.log
```

-   Save the file and exit <code>( ctrl + x, ctrl + y, enter)</code>

<br>

## :point_right: Supervisor start

-   Then you need to update supervisor and start the notifier group

```sh
supervisorctl reread
```

```sh
supervisorctl update
```

```sh
supervisorctl start notifier:*
```

## :point_right: SSH connection

-   in progress ...

<br>
<br>
<br>

<div align="center">
    <h1>vytvořil:</h1>
    <a href="https://ludwigtomas.cz/">
        Ludwig Tomáš
    </a>
</div>
