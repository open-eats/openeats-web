import React from 'react';
import NoResults from '../components/NoResults';
import createComponentWithIntl from '../../../jest_mocks/createComponentWithIntl';

test('NoResults component test', () => {
  const component = createComponentWithIntl(
    <NoResults/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
