import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom'

const createComponentWithRouter = ( children ) => {
  return renderer.create(
    <MemoryRouter>
      { children }
    </MemoryRouter>
  );
};

export default createComponentWithRouter;