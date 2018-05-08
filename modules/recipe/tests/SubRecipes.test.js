import React from 'react';
import SubRecipes from '../components/SubRecipes';
import createComponentWithIntlAndRouter from '../../../config/jest/createComponentWithIntlAndRouter';

import data from './data';

test('Test Sub Recipes', () => {
  const check = jest.fn();
  const component = createComponentWithIntlAndRouter(
    <SubRecipes data={ data.subrecipes } check={ check }/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
