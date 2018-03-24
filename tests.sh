#!/usr/bin/env sh

# Install test related dependencies
yarn add coveralls

env
pwd
ls
# Run the tests and create a coverage report
yarn test -- --coverage

# Submit coverage to Coveralls
coveralls < coverage/lcov.info