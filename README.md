<h1 align="center">
The Notifier
</h1>

## Description
The main purpose of this website is to store database backups, VPS information (IP, Port, username, password),
catch updates pushed into Gitlab and depending on this, send email to "client". 

## Frameworks
-   Laravel 10.x
-   InertiaJS
-   ReactJS
-   MySQL
-   TailwindCSS 3.x

## Project setup

1. Download project form Gitlab
```sh
git clone https://gitlab.com/bubak1/portfolio/the-notifier.git
```

2. Open folder
```sh
cd Notifier
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
