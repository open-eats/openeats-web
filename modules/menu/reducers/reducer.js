import { combineReducers } from 'redux'
import { default as menus } from './MenuReducer'
import { default as items } from './MenuItemsReducer'
import { default as status } from './status'

const menu = combineReducers({
  menus,
  items,
  status
});

export default menu
