import queryString from 'query-string'

import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config'
import FilterConstants from '../constants/FilterConstants'

const parsedFilter = filter => {
  let parsedFilters = {};
    for (let f in filter) {
      if (!['limit', 'offset'].includes(f)) {
        parsedFilters[f] = filter[f];
      }
    }
    return parsedFilters;
};

export const loadCourses = (filter) => {
  return dispatch => {
    dispatch({
      type: FilterConstants.BROWSE_FILTER_LOADING,
      filterName: FilterConstants.BROWSE_FILTER_COURSE,
    });

    request()
      .get(serverURLs.course_count)
      .query(parsedFilter(filter))
      .then(res => (
        dispatch({
          type: FilterConstants.BROWSE_FILTER_LOAD,
          filterName: FilterConstants.BROWSE_FILTER_COURSE,
          qs: queryString.stringify(filter),
          res: res.body.results
        })
      ))
      .catch(err => (
        dispatch({
          type: FilterConstants.BROWSE_FILTER_ERROR,
          filterName: FilterConstants.BROWSE_FILTER_COURSE,
        })
      ));
  }
};

export const loadCuisines = (filter) => {
  return dispatch => {
    dispatch({
      type: FilterConstants.BROWSE_FILTER_LOADING,
      filterName: FilterConstants.BROWSE_FILTER_CUISINE,
    });

    request()
      .get(serverURLs.cuisine_count)
      .query(parsedFilter(filter))
      .then(res => (
        dispatch({
          type: FilterConstants.BROWSE_FILTER_LOAD,
          filterName: FilterConstants.BROWSE_FILTER_CUISINE,
          qs: queryString.stringify(filter),
          res: res.body.results
        })
      ))
      .catch(err => (
        dispatch({
          type: FilterConstants.BROWSE_FILTER_ERROR,
          filterName: FilterConstants.BROWSE_FILTER_CUISINE,
        })
      ));
  }
};

export const loadRatings = (filter) => {
  return dispatch => {
    dispatch({
      type: FilterConstants.BROWSE_FILTER_LOADING,
      filterName: FilterConstants.BROWSE_FILTER_RATING,
    });

    request()
      .get(serverURLs.ratings)
      .query(parsedFilter(filter))
      .then(res => (
        dispatch({
          type: FilterConstants.BROWSE_FILTER_LOAD,
          filterName: FilterConstants.BROWSE_FILTER_RATING,
          qs: queryString.stringify(filter),
          res: res.body.results
        })
      ))
      .catch(err => (
        dispatch({
          type: FilterConstants.BROWSE_FILTER_ERROR,
          filterName: FilterConstants.BROWSE_FILTER_RATING,
        })
      ));
  }
};
