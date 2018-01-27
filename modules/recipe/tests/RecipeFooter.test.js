import React from 'react';
import RecipeFooter from '../components/RecipeFooter';
import createComponentWithIntlAndRouter from '../../../jest_mocks/createComponentWithIntlAndRouter';

test('Test Footer without Edit Link', () => {
  const component = createComponentWithIntlAndRouter(
    <RecipeFooter
        id={ 1 }
        source={ 'google.com' }
        usernamek={ 'Ryan Noelk' }
        updateDate={ '2017-01-01' }
        showEditLink={ false }
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Test Footer with Edit Link', () => {
  const component = createComponentWithIntlAndRouter(
    <RecipeFooter
        id={ 1 }
        source={ 'google.com' }
        usernamek={ 'Ryan Noelk' }
        updateDate={ '2017-01-01' }
        showEditLink={ true }
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
