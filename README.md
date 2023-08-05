# Storefront backend
This repo contains the backend application for an eCommerce store front. It is a RESTful API.

The database schema and and API route information can be found in the [requirements doc](REQUIREMENTS.md).
## Libraries used
The application uses the following libraries: 
* Runtime: Node.js (JavaScript)
* Web application framework: Express
* Language: TypeScript 
* Database: Postgres
* Testing: Jasmine and Supertest

## Installation Instructions

### Dev mode
To install the app's dependencies and use the app in dev mode, run the following: 
Installed `postgres` on your local system and connect into server.
Create DB by script: create database storefront_dev;

`yarn dev-up` runs the migrations to create the tables.
`yarn dev-down` runs the migrations to drop the tables.

To run the app in dev mode execute `yarn start`.
### Test mode
To install the app's dependencies and use the app in test mode, run the following:
Installed `postgres` on your local system and connect into server.
Create DB by script: create database storefront_test;

`yarn test-up` runs the migrations to create the tables.
`yarn test-down` runs the migrations to drop the tables.

To run the tests execute `yarn test`.

### Ports
The application runs on port `3000` with database on `5432`.

### Environment variables 
To satisfy Udacity requirements, the following environment variable are needed.
```
NODE_ENV = dev

# DB VARIABLES
DB_HOST=localhost
DB_PORT=5432
DB_NAME_DEV=storefront_dev
DB_NAME_TEST=storefront_test
DB_USER=postgres
DB_PASS=123456

# BCRYPT VARIABLES
BCRYPT_PASSWORD=$2a$08$j3hOyrJ8X0zcPOCZHyVw4uggAO7hkBipA/QscePpVSpOEGrsUGaYu
SALT_ROUNDS=8

# JWT
JWT_SECRET=anhhaiphuong@22
```
