import { combineReducers } from 'redux'

import { default as ratings } from './RatingsReducer'

const rating = combineReducers({
  ratings,
});

export default rating
