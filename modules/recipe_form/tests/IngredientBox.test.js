import React from 'react';
import IngredientBox from '../components/IngredientBox';
import createComponentWithIntl from '../../../jest_mocks/createComponentWithIntl';

test('IngredientBox component test', () => {
  const component = createComponentWithIntl(
    <IngredientBox/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
