import { combineReducers } from 'redux'
import RecipeGroupConstants from '../constants/RecipeGroupConstants'

function createRecipeGroupWithNamedType(groupName = '') {
  return function recipeGroup(state = [], action) {
    if (action.groupName !== groupName) {
      return state;
    }

    switch (action.type) {
      case RecipeGroupConstants.RECIPE_GROUP_INIT:
        return action.data;
      default:
        return state;
    }
  }
}

const recipeGroups = combineReducers({
  courses: createRecipeGroupWithNamedType(RecipeGroupConstants.RECIPE_GROUP_COURSE),
  cuisines: createRecipeGroupWithNamedType(RecipeGroupConstants.RECIPE_GROUP_CUISINE),
  tags: createRecipeGroupWithNamedType(RecipeGroupConstants.RECIPE_GROUP_TAG),
});

export default recipeGroups
