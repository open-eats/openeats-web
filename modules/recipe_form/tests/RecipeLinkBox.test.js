import React from 'react';
import SubRecipeBox from '../components/SubRecipeBox';
import createComponentWithIntl from '../../../jest_mocks/createComponentWithIntl';

test('SubRecipeBox component test', () => {
  const component = createComponentWithIntl(
    <SubRecipeBox/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
