import React from 'react';
import NoResults from '../components/NoResults';
import createComponentWithIntl from '../../../config/jest/createComponentWithIntl';

test('NoResults component test', () => {
  const component = createComponentWithIntl(
    <NoResults/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
