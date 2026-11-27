import recipes from '../reducers/RecipeReducer'
import RecipeConstants from '../constants/RecipeConstants'

const data = (servings) => ({
  id: 1, slug: 'soup', servings, subrecipes: [],
  ingredient_groups: [{ title: '', ingredients: [
    { id: 1, numerator: 2, denominator: 1, measurement: 'cups', title: 'milk' }
  ] }]
});
const load = (state, servings) => recipes(state, { type: RecipeConstants.RECIPE_LOAD, data: data(servings) });
const resize = (state, customServings) => recipes(state, {
  type: RecipeConstants.RECIPE_INGREDIENT_SERVINGS_UPDATE, recipeSlug: 'soup', customServings
});
const milk = (state) => state[0].ingredient_groups[0].ingredients[0].quantity;
// The reset (X) button shows when customServings differs from servings.
const expectAsSaved = (state, servings) => {
  expect(state.length).toBe(1);
  expect(state[0].servings).toBe(servings);
  expect(state[0].customServings).toBe(servings);
  expect(milk(state)).toBe('2');
};

describe('RecipeReducer servings', () => {
  it('shows a newly loaded recipe as saved', () => {
    expectAsSaved(load([], 6), 6);
  });

  it('shows a recipe loaded again as saved', () => {
    expectAsSaved(load(load([], 6), 6), 6);
  });

  it('does not rescale after the saved servings were edited', () => {
    expectAsSaved(load(load([], 4), 6), 6);
  });

  it('resizes on a manual change, and a reload goes back to the saved recipe', () => {
    const resized = resize(load([], 4), 8);
    expect(resized[0].customServings).toBe(8);
    expect(milk(resized)).toBe('4');
    expectAsSaved(load(resized, 4), 4);
  });
});
