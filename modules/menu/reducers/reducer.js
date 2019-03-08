import { combineReducers } from 'redux'
import items from './MenuItemsReducer'
import status from './status'
import stats from './StatsReducer'

const menu = combineReducers({
  items,
  stats,
  status
});

export default menu
