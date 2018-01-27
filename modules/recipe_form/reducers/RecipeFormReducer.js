import RecipeFormConstants from '../constants/RecipeFormConstants'

function form(state = [], action) {
  switch (action.type) {
    case RecipeFormConstants.RECIPE_FORM_INIT:
      return [...state, { ...action.data, errors: [] }];
    case RecipeFormConstants.RECIPE_FORM_UPDATE:
      return state.map(recipe => {
        if (recipe.id == action.recipe) {
          let newState = [], errors = [];
          errors[action.name] = action.error;
          newState[action.name] = action.value;
          return {...recipe, ...newState, errors: { ...recipe.errors, ...errors }};
        }
        return recipe;
      });
    case RecipeFormConstants.RECIPE_FORM_ERROR:
      return state.map(recipe => {
        if (recipe.id == action.recipe) {
          let errors = [];
          errors[action.name] = action.error;
          return {...recipe, errors: { ...recipe.errors, ...errors }};
        }
        return recipe;
      });
    case RecipeFormConstants.RECIPE_FORM_SUBMIT:
      if (action.newRecipeId != action.oldRecipeId) {
        return state.map(recipe => {
          if (recipe.id == action.oldRecipeId) {
            return {...recipe, id: action.newRecipeId };
          }
          return recipe;
        });
      }
      return state;
    default:
      return state;
  }
}

export default form
