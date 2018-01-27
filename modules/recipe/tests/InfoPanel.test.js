import React from 'react';
import InfoPanel from '../components/InfoPanel';
import createComponentWithIntl from '../../../jest_mocks/createComponentWithIntl';

test('Short Info Panel', () => {
  const mockUpdateServings = jest.fn();
  const component = createComponentWithIntl(
    <InfoPanel
        cookTime={ 20 }
        prepTime={ 40 }
        servings={ 8 }
        info={ 'This is a test!' }
        updateServings={ mockUpdateServings }
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Long Info Panel', () => {
  const mockUpdateServings = jest.fn();
  const longString = 'Lorem ipsum dolor sit amet, odio sem vel ' +
      'nulla aliquam, vestibulum pellentesque at risus eros, at ' +
      'leo mi urna quam, magna nunc vestibulum nibh condimentum ' +
      'arcu. Eu nunc blandit arcu magna, morbi eleifend dolor, nam ' +
      'ratione justo ullamcorper platea malesuada donec, fusce' +
      ' luctus varius. Vel ipsum nunc in justo, pulvinar magna ' +
      'interdum ut nunc vestibulum. Lorem dui vitae. Lectus elit vel' +
      ' lorem purus, in tortor, mi diam mus venenatis sit bibendum eu.' +
      ' Odio nec lectus quisquam ac eleifend sem, arcu congue neque neque ' +
      'nunc, nam maecenas, nec mauris pede erat dignissim, in gravida tempor.' +
      ' In amet mauris odio vitae montes. Nec vitae nostrud vestibulum, ' +
      'at in tincidunt justo varius wisi ut, nullam wisi erat ' +
      'lorem tempor ac. Lorem ipsum dolor sit amet, odio sem vel ' +
      'nulla aliquam, vestibulum pellentesque at risus eros, at ' +
      'leo mi urna quam, magna nunc vestibulum nibh condimentum ' +
      'arcu. Eu nunc blandit arcu magna, morbi eleifend dolor, nam ' +
      'ratione justo ullamcorper platea malesuada donec, fusce' +
      ' luctus varius. Vel ipsum nunc in justo, pulvinar magna ' +
      'interdum ut nunc vestibulum. Lorem dui vitae. Lectus elit vel' +
      ' lorem purus, in tortor, mi diam mus venenatis sit bibendum eu.' +
      ' Odio nec lectus quisquam ac eleifend sem, arcu congue neque neque ' +
      'nunc, nam maecenas, nec mauris pede erat dignissim, in gravida tempor.' +
      ' In amet mauris odio vitae montes. Nec vitae nostrud vestibulum, ' +
      'at in tincidunt justo varius wisi ut, nullam wisi erat ' +
      'lorem tempor ac.';
  const component = createComponentWithIntl(
    <InfoPanel
        cookTime={ 200000 }
        prepTime={ 200000 }
        servings={ 200000 }
        info={ longString }
        updateServings={ mockUpdateServings }
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
