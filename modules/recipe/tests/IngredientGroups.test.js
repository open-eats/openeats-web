import React from 'react';
import IngredientGroups from '../components/IngredientGroups';
import renderer from 'react-test-renderer';

import data from './data';

test('Ingredient Group component test', () => {
  const check = jest.fn();
  const component = renderer.create(
    <IngredientGroups data={ data.ingredient_groups } check={ check }/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
