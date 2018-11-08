import RC from '../constants/RatingsConstants'

function ratings(state = {}, action) {
  switch (action.type) {
    case RC.LOAD:
      return {[action.recipeSlug]: action.data, ...state};
    case RC.ADD:
      let comments =  state.hasOwnProperty(action.recipe) ? [...state[action.recipe]] : [];
      comments = [...comments, {
        id: action.id,
        recipe: action.recipe,
        rating: action.rating,
        comment: action.comment,
      }];
      return {...state, [action.recipe]: [...comments]};
    case RC.DELETE:
      let safeComments =  state.hasOwnProperty(action.recipe) ? [...state[action.recipe]] : [];
      safeComments = safeComments.filter(c => c.id !== action.id);
      return { ...state, [action.recipe]: [...safeComments] };
    default:
      return state;
  }
}

export default ratings
