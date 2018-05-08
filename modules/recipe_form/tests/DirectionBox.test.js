import React from 'react';
import DirectionBox from '../components/DirectionBox';
import createComponentWithIntl from '../../../config/jest/createComponentWithIntl';

test('DirectionBox component test', () => {
  const component = createComponentWithIntl(
    <DirectionBox/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
