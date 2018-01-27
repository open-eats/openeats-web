import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config'
import RecipeConstants from '../constants/RecipeConstants';

export const bulkAdd = (items, list) => {
  return (dispatch) => {
    const format = (i) => {
      let quantity = i.customQuantity ? i.customQuantity : i.quantity;
      quantity = i.quantity ? i.quantity + " " : '';
      let measurement = i.measurement ? i.measurement + " " : '';
      return quantity + measurement + i.title;
    };

    let checkedIngredients = items.ingredient_groups.map(item => {
      return item.ingredients.reduce((myList, ingredient) => {
        if (ingredient && ingredient.checked) {
          myList.push({list: list, title: format(ingredient)})
        }
        return myList
      }, []);
    });

    let checkedSubRecipe = items.subrecipes.reduce((myList, ingredient) => {
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
            value: false,
            recipe: items.id
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
