#!/usr/bin/env sh

# Install test related dependencies
yarn add coveralls@2.12.0

# Run the tests and create a coverage report
#yarn test
#if [ $? -eq 0 ]
#then
#  echo "The script ran ok"
#  exit 0
#else
#  echo "The script failed" >&2
#  exit 1
#fi

yarn test -- --coverage
if [ $? -eq 0 ]
then
  echo "The script ran ok"
  exit 0
else
  echo "The script failed" >&2
  exit 1
fi

# Submit coverage to Coveralls
./node_modules/coveralls/bin/coveralls.js < coverage/lcov.info