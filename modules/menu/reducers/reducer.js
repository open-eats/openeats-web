import { combineReducers } from 'redux'
import { default as menus } from './MenuReducer'
import { default as items } from './MenuItemsReducer'

const menu = combineReducers({
  menus,
  items
});

export default menu
