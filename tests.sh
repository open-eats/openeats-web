#!/usr/bin/env sh

# Install test related dependencies
yarn add coveralls@2.12.0

# Run the tests and create a coverage report
yarn test
yarn test -- --coverage

# Submit coverage to Coveralls
./node_modules/coveralls/bin/coveralls.js < coverage/lcov.info