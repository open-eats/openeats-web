import RecipeConstants from '../constants/RecipeConstants'
import { default as ingredient } from './IngredientReducer'
import { default as subrecipes } from './SubRecipeReducer'

const recipes = (state = [], action) => {
  switch (action.type) {
    case RecipeConstants.RECIPE_LOAD:
      let recipe = state.find(t => t.id === action.data.id);
      if (recipe) {
        return state.map(recipe => {
          if (recipe.id === action.data.id) {
            let customServings = action.data.servings;
            let servingMultiplier = 1;
            if (action.data.servings === recipe.servings) {
              customServings = recipe.customServings;
              servingMultiplier = recipe.customServings ? recipe.customServings / recipe.servings : 1;
            }
            let subRecipes = subrecipes(
              recipe.subrecipes,
              { subrecipes: action.data.subrecipes,
                servings: servingMultiplier,
                type: action.type }
            );
            let ingredients = ingredient(
              recipe.ingredient_groups,
              { ingredient_groups: action.data.ingredient_groups,
                servings: servingMultiplier,
                type: action.type }
            );
            return {
              ...action.data,
              customServings: customServings,
              subrecipes: subRecipes,
              ingredient_groups: ingredients
            };
          }
          return recipe;
        });
      } else {
        return [
          ...state,
          { ...action.data }
        ]
      }
    case RecipeConstants.RECIPE_INGREDIENT_SERVINGS_UPDATE:
      return state.map(recipe => {
        if (recipe.id == action.recipe){
          action.servings = action.value / recipe.servings;
          let subRecipes = subrecipes(recipe.subrecipes, action);
          let ingredients = ingredient(recipe.ingredient_groups, action);
          return {
            ...recipe,
            subrecipes: subRecipes,
            ingredient_groups: ingredients,
            customServings: action.value
          };
        }
        return recipe;
      });
    case RecipeConstants.RECIPE_INGREDIENT_SERVINGS_RESET:
      return state.map(recipe => {
        if (recipe.id == action.recipe){
          let subRecipes = subrecipes(recipe.subrecipes, action);
          let ingredients = ingredient(recipe.ingredient_groups, action);
          return {
            ...recipe,
            subrecipes: subRecipes,
            ingredient_groups: ingredients,
            customServings: recipe.servings
          };
        }
        return recipe;
      });
    case (action.type.indexOf(RecipeConstants.RECIPE_INGREDIENT) !== -1 ? action.type : '') :
      return state.map(recipe => {
        if (recipe.id == action.recipe){
          let subRecipes = subrecipes(recipe.subrecipes, action);
          let ingredients = ingredient(recipe.ingredient_groups, action);
          return {
            ...recipe,
            subrecipes: subRecipes,
            ingredient_groups: ingredients
          };
        }
        return recipe;
      });
    default:
      return state;
  }
};

export default recipes
