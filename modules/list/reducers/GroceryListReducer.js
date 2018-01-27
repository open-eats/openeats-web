import { combineReducers } from 'redux'
import { default as lists } from './ListReducer'
import { default as error } from './ErrorReducer'

const list = combineReducers({
  lists,
  error
});

export default list
