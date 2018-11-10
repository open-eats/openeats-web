import RC from '../constants/RatingsConstants'

function ratings(state = {}, action) {
  let comments =  state.hasOwnProperty(action.recipe) ? [...state[action.recipe]] : [];
  switch (action.type) {
    case RC.LOAD:
      return {[action.recipeSlug]: [...comments, ...action.data], ...state};
    case RC.ADD:
      comments = [...comments, {
        id: action.id,
        recipe: action.recipe,
        rating: action.rating,
        comment: action.comment,
        user_id: action.user_id,
        username: action.username,
      }];
      return {...state, [action.recipe]: [...comments]};
    case RC.DELETE:
      comments = comments.filter(c => c.id !== action.id);
      return { ...state, [action.recipe]: [...comments] };
    default:
      return state;
  }
}

export default ratings
