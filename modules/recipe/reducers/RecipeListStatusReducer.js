import RecipeConstants from '../constants/RecipeConstants'
import RecipeListStatusConstants from '../constants/RecipeListStatusConstants'

const status = (state = '', action) => {
  switch (action.type) {
    case RecipeConstants.RECIPE_LIST_LOADING:
      return RecipeListStatusConstants.LOADING;
    case RecipeConstants.RECIPE_LIST_COMPLETE:
      return RecipeListStatusConstants.COMPLETE;
    case RecipeConstants.RECIPE_LIST_ERROR:
      return RecipeListStatusConstants.ERROR;
    case RecipeConstants.RECIPE_LIST_BLANK:
      return '';
    default:
      return state
  }
};

export default status
