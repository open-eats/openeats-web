import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import reducer from '../common/reducer'

const store = createStore(
  reducer,
  { user: JSON.parse(localStorage.getItem('user')) || { id: 0 } },
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
  )
);

export default store;
