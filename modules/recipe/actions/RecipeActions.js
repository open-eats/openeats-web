import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config'
import RecipeConstants from '../constants/RecipeConstants';
import history from '../../common/history'

export const load = (recipeSlug) => {
  return (dispatch) => {
    request()
      .get(serverURLs.recipe + recipeSlug + "/")
      .then(res => dispatch({type: RecipeConstants.RECIPE_LOAD, data: res.body}))
      .catch(err => {
        process.ENV.NODE_ENV!=='demo' ? history.replace('/notfound') : '';
      })
  }
};

export const deleteRecipe = (recipeSlug) => {
  return (dispatch) => {
    request()
      .delete(serverURLs.recipe + recipeSlug + "/")
      .then(res => {
        dispatch({type: RecipeConstants.RECIPE_DELETE});
        history.push('/browse');
      })
  }
};

export const updateServings = (key, value, recipeId) => {
  return (dispatch) => {
    dispatch({
      type: RecipeConstants.RECIPE_INGREDIENT_SERVINGS_UPDATE,
      value,
      recipeId
    })
  }
};

export const resetServings = (event, recipeId) => {
  return (dispatch) => {
    dispatch({
      type: RecipeConstants.RECIPE_INGREDIENT_SERVINGS_RESET,
      recipeId
    })
  }
};

export const checkIngredient = (id, value, recipeId) => {
  return (dispatch) => {
    dispatch({
      type: RecipeConstants.RECIPE_INGREDIENT_CHECK_INGREDIENT,
      id,
      value,
      recipeId
    })
  }
};

export const checkSubRecipe = (id, value, recipeId) => {
  return (dispatch) => {
    dispatch({
      type: RecipeConstants.RECIPE_INGREDIENT_CHECK_SUBRECIPE,
      id,
      value,
      recipeId
    })
  }
};

export const checkAll = (event, recipeId) => {
  return (dispatch) => {
    dispatch({
      type: RecipeConstants.RECIPE_INGREDIENT_CHECK_ALL,
      recipeId
    })
  }
};

export const unCheckAll = (event, recipeId) => {
  return (dispatch) => {
    dispatch({
      type: RecipeConstants.RECIPE_INGREDIENT_UNCHECK_ALL,
      recipeId
    })
  }
};