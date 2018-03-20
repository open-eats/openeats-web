#!/usr/bin/env sh

# Install test related dependencies
yarn add coveralls
apk update
apk add git
apk add curl

# Run the tests and create a coverage report
jest --coverage

# Submit coverage to Coveralls
coveralls
