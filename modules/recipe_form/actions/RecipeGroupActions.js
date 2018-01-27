import { request } from '../../common/CustomSuperagent';
import RecipeGroupConstants from '../constants/RecipeGroupConstants';
import { serverURLs } from '../../common/config'

export const fetchTags = () => {
  return (dispatch) => {
    request()
      .get(serverURLs.tag)
      .then(res => {
        dispatch({
          type: RecipeGroupConstants.RECIPE_GROUP_INIT,
          groupName: RecipeGroupConstants.RECIPE_GROUP_TAG,
          data: res.body.results
        });
      })
      .catch(err => { console.error(serverURLs.tag, err.toString()); });
  }
};

export const fetchCuisines = () => {
  return (dispatch) => {
    request()
      .get(serverURLs.cuisine)
      .then(res => {
        dispatch({
          type: RecipeGroupConstants.RECIPE_GROUP_INIT,
          groupName: RecipeGroupConstants.RECIPE_GROUP_CUISINE,
          data: res.body.results
        });
      })
      .catch(err => { console.error(serverURLs.cuisine, err.toString()); });
  }
};

export const fetchCourses = () => {
  return (dispatch) => {
    request()
      .get(serverURLs.course)
      .then(res => {
        dispatch({
          type: RecipeGroupConstants.RECIPE_GROUP_INIT,
          groupName: RecipeGroupConstants.RECIPE_GROUP_COURSE,
          data: res.body.results
        });
      })
      .catch(err => { console.error(serverURLs.course, err.toString()); });
  }
};
