import React from 'react';
import SubRecipeBox from '../components/SubRecipeBox';
import createComponentWithIntl from '../../../config/jest/createComponentWithIntl';

test('SubRecipeBox component test', () => {
  const component = createComponentWithIntl(
    <SubRecipeBox/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
