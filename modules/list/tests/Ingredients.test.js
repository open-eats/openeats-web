import React from 'react';
import MyLists from '../components/MyLists';
import createComponentWithIntlAndRouter from '../../../jest_mocks/createComponentWithIntlAndRouter.js';

import listData from './listData';

test('MyLists component test', () => {
  const component = createComponentWithIntlAndRouter(
    <MyLists title="My Lists" lists={ listData }/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('MyLists component test w/ no lists', () => {
  const component = createComponentWithIntlAndRouter(
    <MyLists title="My Lists" lists={ [] }/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
