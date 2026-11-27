import RecipeConstants from '../constants/RecipeConstants'
import { default as ingredient } from './IngredientReducer'
import { default as subrecipes } from './SubRecipeReducer'
import fq from '../utilts/formatQuantity'

const recipes = (state = [], action) => {
  switch (action.type) {
    case RecipeConstants.RECIPE_LOAD: {
      // A loaded recipe is always shown at its own servings, also when it was loaded before:
      // amounts as saved, and no reset button until the servings are changed by hand.
      const old = state.find(t => t.id === action.data.id);
      const formatQuantity = fq.bind(this, action.data.servings, action.data.servings);
      const loaded = {
        ...action.data,
        subrecipes: subrecipes(
          old ? old.subrecipes : [],
          { subrecipes: action.data.subrecipes, formatQuantity, type: action.type }
        ),
        ingredient_groups: ingredient(
          old ? old.ingredient_groups : [],
          { ingredient_groups: action.data.ingredient_groups, formatQuantity, type: action.type }
        ),
        customServings: action.data.servings
      };
      return old ?
        state.map(recipe => recipe.id === loaded.id ? loaded : recipe) :
        [...state, loaded];
    }
    case RecipeConstants.RECIPE_INGREDIENT_SERVINGS_UPDATE:
      return state.map(recipe => {
        if (recipe.slug === action.recipeSlug){
          action.servings = recipe.servings;
          let subRecipes = subrecipes(
            recipe.subrecipes,
            { formatQuantity: fq.bind(this, recipe.servings, action.customServings),
              type: action.type }
          );
          let ingredients = ingredient(
            recipe.ingredient_groups,
            { formatQuantity: fq.bind(this, recipe.servings, action.customServings),
              type: action.type }
          );
          return {
            ...recipe,
            subrecipes: subRecipes,
            ingredient_groups: ingredients,
            customServings: action.customServings
          };
        }
        return recipe;
      });
    case (action.type.indexOf(RecipeConstants.RECIPE_INGREDIENT) !== -1 ? action.type : '') :
      return state.map(recipe => {
        if (recipe.slug === action.recipeSlug){
          return {
            ...recipe,
            subrecipes: subrecipes(recipe.subrecipes, action),
            ingredient_groups: ingredient(recipe.ingredient_groups, action)
          };
        }
        return recipe;
      });
    default:
      return state;
  }
};

export default recipes
