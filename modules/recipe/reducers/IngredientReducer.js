import RecipeConstants from '../constants/RecipeConstants'

const ingredients = (state, cb) => {
  return state.map(ig => {
    return {
      ...ig,
      ingredients: ig.ingredients.map(ingredient => {
        return cb(ingredient)
      })
    }
  });
};

const merge = (state, action) => {
  let list = [];
  // eslint-disable-next-line
  state.map((ig) => {
    // eslint-disable-next-line
    ig.ingredients.map(ingredient => {
      if (ingredient.checked) {
        list.push(ingredient.id);
      }
    });
  });

  return ingredients(action.ingredient_groups, (i) => {
    let checked = list.includes(i.id);
    let custom = action.formatQuantity(i.numerator, i.denominator);
    return {...i, quantity: custom, checked: checked}
  })
};

const recipes = (state = [], action) => {
  switch (action.type) {
    case RecipeConstants.RECIPE_LOAD:
      return state ? merge(state, action) : action;
    case RecipeConstants.RECIPE_INGREDIENT_CHECK_INGREDIENT:
      return ingredients(state, (i) => {
        if (i.id === action.id) {
          return {...i, checked: action.value}
        }
        return i
      });
    case RecipeConstants.RECIPE_INGREDIENT_CHECK_ALL:
      return ingredients(state, (i) => {
        return {...i, checked: true}
      });
    case RecipeConstants.RECIPE_INGREDIENT_UNCHECK_ALL:
      return ingredients(state, (i) => {
        return {...i, checked: false}
      });
    case RecipeConstants.RECIPE_INGREDIENT_SERVINGS_UPDATE:
      return ingredients(state, (i) => {
        let custom = action.formatQuantity(i.numerator, i.denominator);
        return {...i, quantity: custom}
      });
    default:
      return state;
  }
};

export default recipes
