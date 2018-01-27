import queryString from 'query-string'

import SearchConstants from '../constants/SearchConstants'
import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config'

export const loadRecipes = (filter) => {
  return dispatch => {
    dispatch({ type: SearchConstants.BROWSE_SEARCH_LOADING });

    const map = {
      'cuisine': 'cuisine__slug',
      'course': 'course__slug'
    };

    let parsedFilter = {};
    for (let f in filter) {
      if (filter[f] !== null) {
        parsedFilter[f in map ? map[f] : f] = filter[f];
      }
    }

    request()
      .get(serverURLs.browse)
      .query(parsedFilter)
      .then(res => (
        dispatch({
          type: SearchConstants.BROWSE_SEARCH_RESULTS,
          qs: queryString.stringify(filter),
          res: res.body
        })
      ));
  }
};
