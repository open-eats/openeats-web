import { combineReducers } from 'redux'

import { default as filters } from './FilterReducer'
import { default as search } from './SearchReducer'
import { default as miniBrowse } from './MiniBrowseReducer'

const browse = combineReducers({
  search,
  filters,
  miniBrowse,
});

export default browse
