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

export const updateServings = (key, value, recipeSlug) => {
  return (dispatch) => {
    dispatch({
      type: RecipeConstants.RECIPE_INGREDIENT_SERVINGS_UPDATE,
      value,
      recipeSlug
    })
  }
};

export const resetServings = (event, recipeSlug) => {
  return (dispatch) => {
    dispatch({
      type: RecipeConstants.RECIPE_INGREDIENT_SERVINGS_RESET,
      recipeSlug
    })
  }
};

export const checkIngredient = (id, value, recipeSlug) => {
  return (dispatch) => {
    dispatch({
      type: RecipeConstants.RECIPE_INGREDIENT_CHECK_INGREDIENT,
      id,
      value,
      recipeSlug
    })
  }
};

export const checkSubRecipe = (id, value, recipeSlug) => {
  return (dispatch) => {
    dispatch({
      type: RecipeConstants.RECIPE_INGREDIENT_CHECK_SUBRECIPE,
      id,
      value,
      recipeSlug
    })
  }
};

export const checkAll = (event, recipeSlug) => {
  return (dispatch) => {
    dispatch({
      type: RecipeConstants.RECIPE_INGREDIENT_CHECK_ALL,
      recipeSlug
    })
  }
};

export const unCheckAll = (event, recipeSlug) => {
  return (dispatch) => {
    dispatch({
      type: RecipeConstants.RECIPE_INGREDIENT_UNCHECK_ALL,
      recipeSlug
    })
  }
};