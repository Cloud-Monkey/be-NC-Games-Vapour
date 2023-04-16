# Northcoders House of Games API

Hosted site: `https://nc-games-jdro.onrender.com/api`

This is an API built with express. This API allows users to do the following things with the tabletop games info contained within the database:

- see reviews
- see comments
- see users
- add new comments
- vote on reviews
- delete comments

## Prerequisites

Node: v19.6.0
Postgres: v14.6

## Clone Repository

Please follow the instructions below to clone the repository locally:

1. go to `https://github.com/Cloud-Monkey/nc-be-project-game_site`
2. open terminal
3. navigate to the directory you want to clone into
4. run command in terminal `git clone https://github.com/Cloud-Monkey/nc-be-project-game_site.git`
5. navigate into the repository with `cd nc-be-project-game_site`

## Env Setup

We'll have two databases in this project. One for real looking dev data and another for simpler test data.

You will need to create two .env files for your project: .env.test and .env.development. Into each, add PGDATABASE=<database_name_here>, with the correct database name for that environment (see /db/setup.sql for the database names). Double check that these .env files are .gitignored.

## Install

To install dependencies, run the following command in your terminal:

```sh
npm ci
```

## Seed database

You have also been provided with a db folder with some data, a setup.sql file and a seeds folder.

Please take some to familiarise yourself with the project structure. The seed function has been written for you, but you should take a look at the table creations to see the structure of the database you'll be working with. You should also take a minute to familiarise yourself with the npm scripts you have been provided.

First, setup the database:

```sh
npm run setup-dbs
```

Then, seed the database:

```sh
npm run seed
```

## Tests

This API is tested with jest and super test. To run the tests:

```sh
npm test
```

## Endpoints for the API

For the list of endpoints available you can either go to `/api` or looks at `endpoints.json` within the repository.

## Author

[Cloud-Monkey](https://github.com/Cloud-Monkey)
