# BASIRA

BASIRA is **B**ooks **a**s **S**ymbols **i**n **R**enaissance **A**rt. This README is the place for important information on running the app, etc.

## Requirements

- PostgreSQL
- Ruby
- NodeJS
- Yarn
- ImageMagick/GraphicsMagick or libvips
- Typesense
- Heroku (optional)

## Installation

Clone the repository
```bash
$ mkdir basira
$ git clone https://github.com/performant-software/basira basira
$ cd basira
```

Install Ruby dependencies
```bash
$ bundle install
```

Install React dependencies
```bash
$ cd client && yarn install
```

## Running the application

#### Heroku
The simplest way to run the application is using Heroku `local` and the `Procfile` to start all services:
```bash
$ heroku local -f Procfile.dev
```

#### Stand-alone
We can also start the application by starting the services independently.

Start the API:
```bash
$ bundle exec rails s -p <port>
```

Start the client:
```bash
$ yarn --cwd client start -p <port>
```

**Note**: When running the client in `development` mode, all requests will automatically be proxied to `http://localhost:3001` unless a `REACT_APP_API_URL` environment variable is provided. This defined in `/client/package.json` under the `proxy` property.

## Docker
The application can also be started in a Docker container:

```bash
$ docker compose -f docker-compose.dev.yml up --build
```

The above command will build the Docker images and start up a service for each of the following:
- PostgreSQL
- Rails API
- React

## Typesense
BASIRA uses Typesense as a search index. Typesense can be run locally or in the cloud, just provide the appropriate `TYPESENSE_*` and `REACT_APP_TYPESENSE_*` environment variables. 

The `TYPESENSE_API_KEY` will be used on the server side to reindex data and should be an admin key.

The `REACT_APP_TYPESENSE_API_KEY` will be used on the client side to make search requests and should be a search-only key.'

To initialize an new search index:
```bash
$ bundle exec rake typesense:reset
```

To update an existing search index:
```bash
$ bundle exec rake typesense:index
```
