import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from '../common/reducer'

let data = { user: JSON.parse(localStorage.getItem('user')) || { id: 0 } };
if (process.env.NODE_ENV === 'demo') {
  data = require('./demo/data.json');
}

const store = createStore(
  reducer,
  data,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
  )
);

export default store;
