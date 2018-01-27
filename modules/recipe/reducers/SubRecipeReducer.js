import RecipeConstants from '../constants/RecipeConstants'

const merge = (state, action) => {
  let list = [];
  state.map((i) => {
    if (i.checked) {
      list.push(i.id);
    }
  });

  return action.subrecipes.map(i => {
    let checked = list.includes(i.child_recipe_id);
    let factor = Math.pow(10, 3);
    let customQuantity = Math.round(i.quantity * factor * action.servings) / factor;
    return {...i, customQuantity: customQuantity, checked: checked}
  });
};

const subRecipes = (state = [], action) => {
  switch (action.type) {
    case RecipeConstants.RECIPE_LOAD:
      return state ? merge(state, action) : action;
    case RecipeConstants.RECIPE_INGREDIENT_CHECK_SUBRECIPE:
      return state.map(i => {
        if (i.child_recipe_id == action.id) {
          return {...i, checked: action.value}
        }
        return i
      });
    case RecipeConstants.RECIPE_INGREDIENT_CHECK_ALL:
      return state.map(i => {
        return {...i, checked: true}
      });
    case RecipeConstants.RECIPE_INGREDIENT_UNCHECK_ALL:
      return state.map(i => {
        return {...i, checked: false}
      });
    case RecipeConstants.RECIPE_INGREDIENT_SERVINGS_UPDATE:
      return state.map(i => {
        let factor = Math.pow(10, 3);
        let custom = Math.round(i.quantity * factor * action.servings) / factor;
        return {...i, customQuantity: custom}
      });
    case RecipeConstants.RECIPE_INGREDIENT_SERVINGS_RESET:
      return state.map(i => {
        return {...i, customQuantity: i.quantity}
      });
    default:
      return state;
  }
};

export default subRecipes
