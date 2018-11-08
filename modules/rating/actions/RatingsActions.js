import RC from '../constants/RatingsConstants'
import {request} from "../../common/CustomSuperagent";
import {serverURLs} from "../../common/config";
import history from "../../common/history";

export const load = (recipeSlug) => {
  return (dispatch) => {
    request()
      .get(serverURLs.ratings + "?recipe__slug=" + recipeSlug)
      .then(res => dispatch({
        type: RC.LOAD,
        recipeSlug: recipeSlug,
        data: res.body.results,
      }))
      .catch(() => {
         if (process.env.NODE_ENV !== 'demo') history.replace('/notfound');
      })
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

export const add = (rating, comment, recipeSlug) => {
  return dispatch => {
    request()
      .post(serverURLs.ratings)
      .send({
        rating: rating,
        comment: comment,
        recipe: recipeSlug,
        //TODO: change this to a var
        author: 1,
      })
      .then(res => dispatch({
        type: RC.ADD,
        id: res.body.id,
        recipe: recipeSlug,
        comment: comment,
        username: res.body.username,
        rating: parseInt(rating)
      }))
      // .catch(() => {
      //    if (process.env.NODE_ENV !== 'demo') history.replace('/notfound');
      // });
  }
};
