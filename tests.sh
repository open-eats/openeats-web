#!/usr/bin/env sh

# Install test related dependencies
yarn add coveralls
apk update
apk add git

# Run the tests and create a coverage report
jest --coverage

# Submit coverage to Coveralls
#./node_modules/coveralls/bin/coveralls.js
