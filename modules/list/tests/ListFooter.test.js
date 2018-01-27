import React from 'react';
import ListFooter from '../components/ListFooter';
import createComponentWithIntl from '../../../jest_mocks/createComponentWithIntl.js';

import {
  ALL_ITEMS,
  ACTIVE_ITEMS,
  COMPLETED_ITEMS
} from '../constants/ListStatus'

test('MyLists component test', () => {
  const mockClearCompleted = jest.fn();
  const mockFilterStatus = jest.fn();
  const component = createComponentWithIntl(
    <ListFooter
        activeFilter={ ALL_ITEMS }
        completedCount={ 3 }
        itemCount={ 6 }
        onClearCompleted={ mockClearCompleted }
        onFilterStatus={ mockFilterStatus }
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('MyLists component test w/ active filter', () => {
  const mockClearCompleted = jest.fn();
  const mockFilterStatus = jest.fn();
  const component = createComponentWithIntl(
    <ListFooter
        activeFilter={ ACTIVE_ITEMS }
        completedCount={ 3 }
        itemCount={ 6 }
        onClearCompleted={ mockClearCompleted }
        onFilterStatus={ mockFilterStatus }
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('MyLists component test w/ completed filter', () => {
  const mockClearCompleted = jest.fn();
  const mockFilterStatus = jest.fn();
  const component = createComponentWithIntl(
    <ListFooter
        activeFilter={ COMPLETED_ITEMS }
        completedCount={ 3 }
        itemCount={ 6 }
        onClearCompleted={ mockClearCompleted }
        onFilterStatus={ mockFilterStatus }
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
