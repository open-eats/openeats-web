import React from 'react';
import RecipeHeader from '../components/RecipeHeader';
import createComponentWithIntl from '../../../jest_mocks/createComponentWithIntl.js';

test('Test Header', () => {
  const component = createComponentWithIntl(
    <RecipeHeader
        photo={ 1 }
        title={ 'Tasty Chili' }
        rating={ 3 }
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Test Header w/ no Photo', () => {
  const component = createComponentWithIntl(
    <RecipeHeader
        title={ 'Tasty Chili' }
        rating={ 3 }
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Test Header w/ bad rating', () => {
  const component = createComponentWithIntl(
    <RecipeHeader
        title={ 'Tasty Chili' }
        rating={ -1 }
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
