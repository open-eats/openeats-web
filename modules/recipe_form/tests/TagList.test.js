import React from 'react';
import TagList from '../components/TagList';
import renderer from 'react-test-renderer';

test('TagList component test', () => {
  const component = renderer.create(
    <TagList/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
