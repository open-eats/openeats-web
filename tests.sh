#!/usr/bin/env sh

# Install test related dependencies
yarn add coveralls@2.12.0

yarn test -- --coverage
if [ $? -eq 0 ]
then
  exit 0
else
  exit 1
fi

# Submit coverage to Coveralls
./node_modules/coveralls/bin/coveralls.js < coverage/lcov.info