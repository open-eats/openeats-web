import { combineReducers } from 'redux'
import { default as recipes } from './RecipeReducer'
import { default as status } from './RecipeListStatusReducer'

const recipe = combineReducers({
  recipes,
  status
});

export default recipe
