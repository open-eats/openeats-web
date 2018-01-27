import React from 'react';
import Ratings from '../components/Ratings';
import renderer from 'react-test-renderer';

test('2 Star Rating test', () => {
  const component = renderer.create(
    <Ratings stars={ 2 }/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('0 Star Rating test', () => {
  const component = renderer.create(
    <Ratings stars={ -3 }/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('4 Star Rating test', () => {
  const component = renderer.create(
    <Ratings stars={ 4 }/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('5 Star Rating test', () => {
  const component = renderer.create(
    <Ratings stars={ 24 }/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
