import RecipeFormConstants from '../constants/RecipeFormConstants'

function form(state = [], action) {
  switch (action.type) {
    case RecipeFormConstants.RECIPE_FORM_INIT:
      let newRecipe = true;
      const recipes = state.map(recipe => {
        if (recipe.slug === action.data.slug) {
          newRecipe = false;
          return { ...recipe, ...action.data, errors: [] };
        }
        return recipe;
      });

      if (newRecipe) {
        return [...state, { ...action.data, errors: [] }];
      }
      return [ ...recipes ];
    case RecipeFormConstants.RECIPE_FORM_UPDATE:
      return state.map(recipe => {
        if (recipe.slug === action.recipeSlug) {
          let newState = [], errors = [];
          errors[action.name] = action.error;
          newState[action.name] = action.value;
          return {...recipe, ...newState, errors: { ...recipe.errors, ...errors }};
        }
        return recipe;
      });
    case RecipeFormConstants.RECIPE_FORM_ERROR:
      return state.map(recipe => {
        if (recipe.id === action.recipe) {
          let errors = [];
          errors[action.name] = action.error;
          return {...recipe, errors: { ...recipe.errors, ...errors }};
        }
        return recipe;
      });
    case RecipeFormConstants.RECIPE_FORM_SUBMIT:
      if (action.newRecipeId !== action.oldRecipeId) {
        return state.map(recipe => {
          if (recipe.id === action.oldRecipeId) {
            return {...recipe, id: action.newRecipeId, slug: action.slug };
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
