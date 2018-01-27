import React from 'react';
import TabbedView from '../components/TabbedView';
import createComponentWithIntl from '../../../jest_mocks/createComponentWithIntl';

test('TabbedView component test', () => {
  const component = createComponentWithIntl(
    <TabbedView>
      hi
      hi
    </TabbedView>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
