# OpenEats Web App

[![Web Build Status](https://travis-ci.org/open-eats/openeats-web.svg?branch=master)](https://travis-ci.org/open-eats/openeats-web)

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