import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config'
import RecipeConstants from '../constants/RecipeConstants';

export const bulkAdd = (recipeState, list) => {
  return (dispatch) => {
    const format = (i) => {
      let quantity = i.customQuantity ? i.customQuantity : i.quantity;
      quantity = quantity ? quantity + " " : '';
      let measurement = i.measurement ? i.measurement + " " : '';
      return quantity + measurement + i.title;
      // let numerator = i.customNumerator ? i.customNumerator : i.numerator;
      // if (i.denominator > 1) {
      //   const whole = numerator / i.denominator;
      //   const fraction = numerator % i.denominator;
      //   if (fraction > 0) {
      //     numerator = whole.toString() + " " + fraction.toString() + "/" + i.denominator.toString()
      //   }
      //   numerator = whole.toString();
      // } else if (numerator > 0) {
      //   numerator = numerator.toString();
      // }
      //
      // numerator = numerator ? numerator + " " : '';
      // return numerator + measurement + i.title;
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
            value: false,
            recipe: recipeState.id
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
