# OpenEats Web App

[![Web Build Status](https://travis-ci.org/open-eats/openeats-web.svg?branch=master)](https://travis-ci.org/open-eats/openeats-web)
[![Coverage Status](https://coveralls.io/repos/github/open-eats/openeats-web/badge.svg)](https://coveralls.io/github/open-eats/openeats-web)

This is the official web app that powers OpenEats. It's built using React/Redux.

See [the homepage](https://github.com/open-eats/OpenEats) for more information about OpenEats!

# Contributing
Please read the [contribution guidelines](https://github.com/open-eats/openeats-web/blob/master/CONTRIBUTING.md) in order to make the contribution process easy and effective for everyone involved.

# Dev Tips

#### Running tests
To run tests locally:

```bash
cd openeats-api
docker-compose -f test.yml -p test build
docker-compose -f test.yml -p test run --rm --entrypoint 'npm test' web
```

#### Generating locale files

After adding new `defineMessages` you'll need to update the locale files. Instead of doing it manually you can run this script to do it for you.

```bash
docker-compose run --rm web sh
./node_modules/.bin/babel-node scripts/merge-locale.js
```

#### Building the demo site

The demo site is built using pure js and relies on populating the redux store when the app starts. If more data needs to be added be sure to update [the demo json](https://github.com/open-eats/openeats-web/tree/master/modules/common/demo)

To Build the demo site, update the dev env file with the below.

```bash
# Node config
NODE_ENV=demo
NODE_API_URL=
NODE_LOCALE=en
```

Then Run:

```bash
docker-compose up node
```

This will generate all the require files in the public folder. These files can be copied directly into the demo repo.