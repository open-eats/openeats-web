import RatingsConstants from '../constants/RatingsConstants'

function search(state = [], action) {
  switch (action.type) {
    case RatingsConstants.RATINGS_ADD:
      return [{
        recipeId: action.recipeId,
        rating: action.rating,
        comment: action.comment
      }, ...state];
    default:
      return state;
  }
}

export default search
