#!/usr/bin/env sh

# Install test related dependencies
yarn add istanbul
apk add git
apk add curl

# Install Code Climate script
curl -L https://codeclimate.com/downloads/test-reporter/test-reporter-latest-linux-amd64 > ./cc-test-reporter
chmod +x ./cc-test-reporter
./cc-test-reporter before-build

# Run the tests and create a coverage report
istanbul cover jest

# Submit coverage to Coveralls
coveralls

# Submit report to Code Climate
./cc-test-reporter after-build --exit-code 0
