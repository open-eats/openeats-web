import React from 'react';
import DirectionBox from '../components/DirectionBox';
import createComponentWithIntl from '../../../jest_mocks/createComponentWithIntl';

test('DirectionBox component test', () => {
  const component = createComponentWithIntl(
    <DirectionBox/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
