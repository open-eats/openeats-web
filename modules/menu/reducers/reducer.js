import { combineReducers } from 'redux'
import { default as items } from './MenuItemsReducer'
import { default as status } from './status'

const menu = combineReducers({
  items,
  status
});

export default menu
