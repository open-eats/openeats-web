#!/usr/bin/env sh

# Install test related dependencies
yarn add coveralls

# Run the tests and create a coverage report
jest --coverage

# Submit coverage to Coveralls
coveralls < coverage/lcov.info