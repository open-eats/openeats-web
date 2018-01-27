import React from 'react';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';

// See: https://github.com/yahoo/react-intl/wiki/Testing-with-React-Intl#jest

const createComponentWithIntl = (children, props = { locale: 'en' }) => {
  return renderer.create(
    <IntlProvider {...props}>
      {children}
    </IntlProvider>
  );
};

export default createComponentWithIntl;