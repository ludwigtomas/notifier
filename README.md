<h1 align="center">
The Notifier
</h1>

# :notebook_with_decorative_cover: Summary

- [Description](#point_right-description)
- [Frameworks](#point_right-frameworks)
- [Requirements](#point_right-requirements)
- [Important](#point_right-important)
- [Project setup](#point_right-project-setup)
    - [Clone project](#clone-project)
    - [Setup ENV file](#setup-env-file)
    - [Start project](#point_right-start-project)
    - [Supervisor setup](#point_right-supervisor-setup)
    - [Supervisor config](#point_right-supervisor-config)

<br>
<br>
- [Contact](#handshake-contact)
    - [Prerequisites](#bangbang-prerequisites)
    - [Installation](#gear-installation)

## :point_right: Description
The main purpose of this website is to store database backups, VPS information (IP, Port, username, password),
catch updates pushed into Gitlab and depending on this, send email to "client" or "clients". 


## :point_right: Frameworks
-   Laravel 10.x
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

## :point_right: Important
-   Supervisor - for running queue, scheduler

## :point_right: Project setup
### Clone project
```sh
git clone https://gitlab.com/bubak1/portfolio/the-notifier.git
```

### Setup ENV file
```sh
cd The-notifier
```

3. Copy .env.example file and create .env file
```sh
cp .env.example .env
```

3. open .env file
```sh
APP_NAME=GreenHosting
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
- name of project 

#### `APP_ENV` (required - local, production)
- local for local development
- production for production build

#### `APP_DEBUG` (required - true, false)
- true for local development
- false for production

#### `APP_URL` (required - localhost, domain url)
- local development -> localhost / 127.0.0.1
- production -> domain url (for example: `APP_URL=https://ludwigtomas.cz/`)

#### `LOG_CHANNEL` (required - stack, daily)
- stack - create laravel.log and all logs are logged here
- daily - creates laravel.log depending on date (`laravel-2023-12-14.log`, `laravel-2023-12-15.log`, `laravel-2023-12-16.log`)

#### `DB_CONNECTION` (required - mysql)
#### `DB_HOST` (required)
#### `DB_PORT` (required)
#### `DB_DATABASE` (required)
#### `DB_USERNAME` (required)
#### `DB_PASSWORD` (required)

## :point_right: Start project

```sh
composer install
```

```sh
npm install
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

## :point_right: Supervisor setup
- <b>laravel_horizon</b> - for managing queues
- <b>pulse_check</b> - check VPS status (Ram, CPU, Disk, etc.)
- <b>pulse_work</b> - for showing visual representation of the data
- <b>schedule_work</b> - for running scheduler

<br>

- First you need to install supervisor
```sh
apt install supervisor
```

- Usual path to supervisor config file is 

```sh
cd /etc/supervisor/conf.d/
```

-  or 

```sh
cd /etc/supervisor/supervisord.conf
```

- Then you need to create new file with <b>.conf</b> extension and paste the following code
- So for example lets create new file called <b>notifier.conf</b> (becase of the project name)

```sh
nano notifier.conf
```

- paste the following code

## :point_right: Supervisor config
<details>
  <summary><code>Supervisor config</code></summary>

```sh
[group:notifier]
programs=laravel_horizon,pulse_check,pulse_work, schedule_work

[program:laravel_horizon]
process_name=%(program_name)s
command=php /home/bubak/Desktop/project/notifier/artisan horizon
directory=/home/bubak/Desktop/project/notifier
autostart=true
autorestart=true
user=www-data
stopwaitsecs=3600
stderr_logfile=/home/bubak/Desktop/project/notifier/storage/logs/horizon.log
stdout_logfile=/home/bubak/Desktop/project/notifier/storage/logs/horizon.log


[program:pulse_check]
process_name=%(program_name)s
command=php /home/bubak/Desktop/project/notifier/artisan pulse:check
directory=/home/bubak/Desktop/project/notifier
autostart=true
autorestart=true
user=www-data
stopwaitsecs=3600
stderr_logfile=/home/bubak/Desktop/project/notifier/storage/logs/pulse.log
stdout_logfile=/home/bubak/Desktop/project/notifier/storage/logs/pulse.log

[program:pulse_work]
process_name=%(program_name)s
command=php /home/bubak/Desktop/project/notifier/artisan pulse:work
directory=/home/bubak/Desktop/project/notifier
autostart=true
autorestart=true
user=www-data
stopwaitsecs=3600
stderr_logfile=/home/bubak/Desktop/project/notifier/storage/logs/pulse.log
stdout_logfile=/home/bubak/Desktop/project/notifier/storage/logs/pulse.log

[program:schedule_work]
process_name=%(program_name)s
command=php /home/bubak/Desktop/project/notifier/artisan schedule:work
directory=/home/bubak/Desktop/project/notifier
autostart=true
autorestart=true
user=www-data
stopwaitsecs=3600
stderr_logfile=/home/bubak/Desktop/project/notifier/storage/logs/schedule_work.log
stdout_logfile=/home/bubak/Desktop/project/notifier/storage/logs/schedule_work.log
```

</details>

- ⚠️ <code>important - change the path to your project path</code> ⚠️

- Save the file and exit <code>( ctrl + x, ctrl + y, enter)</code>

<br>

- Then you need to update supervisor and start the notifier group

```sh
supervisorctl reread
```

```sh
supervisorctl update
```

```sh
supervisorctl start notifier:*
```
