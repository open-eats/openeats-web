import RecipeConstants from '../constants/RecipeConstants'
import { default as ingredient } from './IngredientReducer'
import { default as subrecipes } from './SubRecipeReducer'
import fq from '../utilts/formatQuantity'

const recipes = (state = [], action) => {
  switch (action.type) {
    case RecipeConstants.RECIPE_LOAD:
      let recipe = state.find(t => t.id === action.data.id);
      let subRecipes, ingredients;
      if (recipe) {
        return state.map(recipe => {
          if (recipe.id === action.data.id) {
            subRecipes = subrecipes(
              recipe.subrecipes,
              { subrecipes: action.data.subrecipes,
                formatQuantity: fq.bind(this, recipe.servings, action.data.servings),
                type: action.type }
            );
            ingredients = ingredient(
              recipe.ingredient_groups,
              { ingredient_groups: action.data.ingredient_groups,
                formatQuantity: fq.bind(this, recipe.servings, action.data.servings),
                type: action.type }
            );
            return {
              ...action.data,
              subrecipes: subRecipes,
              ingredient_groups: ingredients
            };
          }
          return recipe;
        });
      } else {
        subRecipes = subrecipes(
          [],
          { subrecipes: action.data.subrecipes,
            formatQuantity: fq.bind(this, action.data.servings, action.data.servings),
            type: action.type }
        );
        ingredients = ingredient(
          [],
          { ingredient_groups: action.data.ingredient_groups,
            formatQuantity: fq.bind(this, action.data.servings, action.data.servings),
            type: action.type }
        );

        return [
          ...state,
          {
            ...action.data,
            subrecipes: subRecipes,
            ingredient_groups: ingredients,
            customServings: action.data.servings
          }
        ]
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
