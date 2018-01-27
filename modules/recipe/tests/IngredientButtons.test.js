import React from 'react';
import RecipeListStatusConstants from '../constants/RecipeListStatusConstants';
import IngredientButtons from '../components/IngredientButtons';
import createComponentWithIntlAndRouter from '../../../jest_mocks/createComponentWithIntlAndRouter';

const lists = [{id: 1, title: 'title'},{id: 2, title: 'tütle'},];

test('Ingredient Buttons Default', () => {
  const bulkAdd = jest.fn();
  const checkAll = jest.fn();
  const unCheckAll = jest.fn();
  const component = createComponentWithIntlAndRouter(
    <IngredientButtons
      listStatus={ '' }
      lists={ lists }
      bulkAdd={ bulkAdd }
      checkAll={ checkAll }
      unCheckAll={ unCheckAll }
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Ingredient Buttons Loading', () => {
  const bulkAdd = jest.fn();
  const checkAll = jest.fn();
  const unCheckAll = jest.fn();
  const component = createComponentWithIntlAndRouter(
    <IngredientButtons
      listStatus={ RecipeListStatusConstants.LOADING }
      lists={ lists }
      bulkAdd={ bulkAdd }
      checkAll={ checkAll }
      unCheckAll={ unCheckAll }
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Ingredient Buttons Complete', () => {
  const bulkAdd = jest.fn();
  const checkAll = jest.fn();
  const unCheckAll = jest.fn();
  const component = createComponentWithIntlAndRouter(
    <IngredientButtons
      listStatus={ RecipeListStatusConstants.COMPLETE }
      lists={ lists }
      bulkAdd={ bulkAdd }
      checkAll={ checkAll }
      unCheckAll={ unCheckAll }
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Ingredient Buttons Error', () => {
  const bulkAdd = jest.fn();
  const checkAll = jest.fn();
  const unCheckAll = jest.fn();
  const component = createComponentWithIntlAndRouter(
    <IngredientButtons
      listStatus={ RecipeListStatusConstants.ERROR }
      lists={ lists }
      bulkAdd={ bulkAdd }
      checkAll={ checkAll }
      unCheckAll={ unCheckAll }
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
