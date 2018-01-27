import React from 'react';
import Directions from '../components/Directions';
import renderer from 'react-test-renderer';

import data from './data';

test('Direction component test', () => {
  const component = renderer.create(
    <Directions data={ data.directions }/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
