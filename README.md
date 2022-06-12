# Class Management

This is the backend of the Class Management project.

## Installation

Run `npm i` to install all the packages for the project. Current node version in use: v18.12.0

## Usage

### Environment variables

Please check the file `.env.example` file to create the local `.env` file to run the server.
The database config will be based on the the environment variable `NODE_ENV`.

Required environment variables to run the server are:

- `SECRET_KEY`, used for JWT Authentication
- `TOKEN_EXPIRETIME`, expire token
- `APP_HOST`, host connect to application
- `APP_PORT`, port connect to application
- `DB_HOST`, host DB
- `DB_NAME`, name DB
- `DB_USER`, username DB
- `DB_PASS`, password DB

In development, you can make change to the `src/config/config.ts` file to connect to your developement database.

### Development

Run `npm run dev` to spin up the development environment. The default endpoint will be `http://localhost:3000`.
The port can be changed by including the environment variable `PORT`.
The database connnection config can be changed in `src/config` folder.

### Production

Run `npm run prod` to start the server. The start script will automatically build, and spin up the server.
When running the app in production, databases environment need to be set to be connected to the database. You need to set database variables including `DB_USER`, `DB_PASS`, `DB_NAME`, `DB_HOST`

### Database

#### Create database

#### Run migrations

Run `npx sequelize-cli db:migrate` to run all pending migrations. The script will build the files and then run the migrations .
The migrations will be used to create and update table models.
