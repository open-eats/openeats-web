import { combineReducers } from 'redux'

import { default as filters } from './FilterReducer'
import { default as search } from './SearchReducer'

const browse = combineReducers({
  search,
  filters,
});

export default browse
