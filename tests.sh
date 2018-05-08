#!/usr/bin/env sh

# Install test related dependencies
yarn add coveralls@2.12.0

yarn test -- --coverage
ret=$?
if [ $ret -ne 0 ]; then
    exit 1
fi

# Submit coverage to Coveralls
./node_modules/coveralls/bin/coveralls.js < coverage/lcov.info