import React from 'react';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom'

const createComponentWithIntl = (children, props = { locale: 'en' }) => {
  return renderer.create(
    <IntlProvider {...props}>
      <MemoryRouter>
        { children }
      </MemoryRouter>
    </IntlProvider>
  );
};

export default createComponentWithIntl;