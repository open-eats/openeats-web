import React from 'react';
import Error from '../components/Error';
import createComponentWithIntl from '../../../jest_mocks/createComponentWithIntl.js';

test('MyLists component test', () => {
  const component = createComponentWithIntl(
    <Error message="There is an error!"/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
