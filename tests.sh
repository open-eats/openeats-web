#!/usr/bin/env sh

# Install test related dependencies
apk add git
apk add curl

# Install Code Climate script
curl -L https://codeclimate.com/downloads/test-reporter/test-reporter-latest-linux-amd64 > ./cc-test-reporter
chmod +x ./cc-test-reporter
./cc-test-reporter before-build

# Run the tests and create a coverage report
jest --coverage

# Submit coverage to Coveralls
coveralls

# Submit report to Code Climate
./cc-test-reporter after-build --coverage-input-type coverage.py --exit-code 0
