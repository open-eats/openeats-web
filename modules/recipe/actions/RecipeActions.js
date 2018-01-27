import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config'
import RecipeConstants from '../constants/RecipeConstants';
import history from '../../common/history'

export const load = (id) => {
  return (dispatch) => {
    request()
      .get(serverURLs.recipe + id + "/")
      .then(res => dispatch({type: RecipeConstants.RECIPE_LOAD, data: res.body}))
      .catch(err => { console.error(err); history.push('/notfound'); })
  }
};

export const deleteRecipe = (id) => {
  return (dispatch) => {
    request()
      .delete(serverURLs.recipe + id + "/")
      .then(res => {
        dispatch({type: RecipeConstants.RECIPE_DELETE});
        history.push('/browse');
      })
  }
};

export const updateServings = (key, value, recipe) => {
  return (dispatch) => {
    dispatch({
      type: RecipeConstants.RECIPE_INGREDIENT_SERVINGS_UPDATE,
      value,
      recipe
    })
  }
};

export const resetServings = (event, recipe) => {
  return (dispatch) => {
    dispatch({
      type: RecipeConstants.RECIPE_INGREDIENT_SERVINGS_RESET,
      recipe
    })
  }
};

export const checkIngredient = (id, value, recipe) => {
  return (dispatch) => {
    dispatch({
      type: RecipeConstants.RECIPE_INGREDIENT_CHECK_INGREDIENT,
      id,
      value,
      recipe
    })
  }
};

export const checkSubRecipe = (id, value, recipe) => {
  return (dispatch) => {
    dispatch({
      type: RecipeConstants.RECIPE_INGREDIENT_CHECK_SUBRECIPE,
      id,
      value,
      recipe
    })
  }
};

export const checkAll = (event, recipe) => {
  return (dispatch) => {
    dispatch({
      type: RecipeConstants.RECIPE_INGREDIENT_CHECK_ALL,
      recipe
    })
  }
};

export const unCheckAll = (event, recipe) => {
  return (dispatch) => {
    dispatch({
      type: RecipeConstants.RECIPE_INGREDIENT_UNCHECK_ALL,
      recipe
    })
  }
};