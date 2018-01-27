import { combineReducers } from 'redux'
import { default as status } from './status'
import { default as form } from './RecipeFormReducer'
import { default as recipeGroups } from './RecipeGroupsReducer'

const recipe = combineReducers({
  form,
  status,
  recipeGroups,
});

export default recipe
