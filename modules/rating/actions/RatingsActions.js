import RatingsConstants from '../constants/RatingsConstants'

export const add = (rating, comment, recipeId) => {
  return dispatch => {
    dispatch({
      type: RatingsConstants.RATINGS_ADD,
      recipeId: recipeId,
      comment: comment,
      rating: parseInt(rating)
    })
  }
};
