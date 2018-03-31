import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config'
import RecipeConstants from '../constants/RecipeConstants';
import history from '../../common/history'

export const load = (recipeSlug) => {
  return (dispatch) => {
    request()
      .get(serverURLs.recipe + recipeSlug + "/")
      .then(res => dispatch({type: RecipeConstants.RECIPE_LOAD, data: res.body}))
      .catch(() => {
         if (process.env.NODE_ENV !== 'demo') history.replace('/notfound');
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
      customServings: isNaN(parseInt(value, 10)) ? 0 : parseInt(value, 10),
      recipeSlug
    })
  }
};

export const resetServings = (servings, event, recipeSlug) => {
  return (dispatch) => {
    dispatch({
      type: RecipeConstants.RECIPE_INGREDIENT_SERVINGS_UPDATE,
      customServings: servings,
      recipeSlug
    })
  }
};

export const checkIngredient = (id, value, recipeSlug) => {
  return (dispatch) => {
    dispatch({
      type: RecipeConstants.RECIPE_INGREDIENT_CHECK_INGREDIENT,
      id: parseInt(id, 10),
      value,
      recipeSlug
    })
  }
};

export const checkSubRecipe = (id, value, recipeSlug) => {
  return (dispatch) => {
    dispatch({
      type: RecipeConstants.RECIPE_INGREDIENT_CHECK_SUBRECIPE,
      id: parseInt(id, 10),
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