import React from 'react';
import Status from '../components/Status';
import renderer from 'react-test-renderer';

test('Status component test', () => {
  const component = renderer.create(
    <Status status={{message: []}}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
