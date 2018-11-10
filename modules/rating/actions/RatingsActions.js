import RC from '../constants/RatingsConstants'
import {request} from "../../common/CustomSuperagent";
import {serverURLs} from "../../common/config";

export const load = (recipeSlug) => {
  return (dispatch) => {
    request()
      .get(serverURLs.ratings + "?recipe__slug=" + recipeSlug)
      .then(res => dispatch({
        type: RC.LOAD,
        recipeSlug: recipeSlug,
        data: res.body.results,
      }))
  }
};

export const remove = (id, recipeSlug) => {
  return (dispatch) => {
    request()
      .delete(serverURLs.ratings + id + '/')
      .then(res => dispatch({
        type: RC.DELETE,
        id: id,
        recipe: recipeSlug,
      }))
  }
};

export const add = (rating, comment, recipeSlug, userId) => {
  return dispatch => {
    request()
      .post(serverURLs.ratings)
      .send({
        rating: rating,
        comment: comment,
        recipe: recipeSlug,
        author: userId,
      })
      .then(res => dispatch({
        type: RC.ADD,
        id: res.body.id,
        recipe: recipeSlug,
        comment: comment,
        user_id: res.body.user_id,
        username: res.body.username,
        rating: parseInt(rating, 10)
      }))
  }
};
