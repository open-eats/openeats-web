import React from 'react';
import Loading from '../components/Loading';
import renderer from 'react-test-renderer';

test('Loading component test', () => {
  const component = renderer.create(
    <Loading/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
