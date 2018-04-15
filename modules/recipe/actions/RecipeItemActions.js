import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config'
import RecipeConstants from '../constants/RecipeConstants';

export const bulkAdd = (recipeState, list) => {
  return (dispatch) => {
    const format = (i) => {
      const quantity = i.quantity && i.quantity !== '0' ? i.quantity + " " : '';
      const measurement = i.measurement ? i.measurement + " " : '';
      return quantity + measurement + i.title;
    };

    let checkedIngredients = recipeState.ingredient_groups.map(item => {
      return item.ingredients.reduce((myList, ingredient) => {
        if (ingredient && ingredient.checked) {
          myList.push({list: list, title: format(ingredient)})
        }
        return myList
      }, []);
    });

    let checkedSubRecipe = recipeState.subrecipes.reduce((myList, ingredient) => {
      if (ingredient && ingredient.checked) {
        myList.push({list: list, title: format(ingredient)})
      }
      return myList
    }, []);

    checkedIngredients = checkedIngredients.reduce((a, b) => a.concat(b), []).concat(checkedSubRecipe);

    if (checkedIngredients.length > 0) {
      dispatch({'type': RecipeConstants.RECIPE_LIST_LOADING});
      request()
        .post(serverURLs.bulk_list_item)
        .send(checkedIngredients)
        .then(res => {
          dispatch({type: RecipeConstants.RECIPE_LIST_COMPLETE});
          dispatch({
            type: RecipeConstants.RECIPE_INGREDIENT_UNCHECK_ALL,
            recipeSlug: recipeState.slug
          })
        })
        .catch(err => { dispatch({type: RecipeConstants.RECIPE_LIST_ERROR}); })
    }
  }
};

export const reset = () => {
  return (dispatch) => {
    dispatch({
      type: RecipeConstants.RECIPE_LIST_BLANK,
    })
  }
};
