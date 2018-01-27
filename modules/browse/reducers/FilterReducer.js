import { combineReducers } from 'redux'
import FilterConstants from '../constants/FilterConstants'

function createFilterWithNamedType(filterName = '') {
  return function filter(state = { results: {}, loading: false, error: false }, action) {
    if (action.filterName !== filterName) {
      return state;
    }

    switch (action.type) {
      case FilterConstants.BROWSE_FILTER_ERROR:
        return { ...state, error: true };
      case FilterConstants.BROWSE_FILTER_LOADING:
        return { ...state, loading: true };
      case FilterConstants.BROWSE_FILTER_LOAD:
        let newFilter = {};
        newFilter[action.qs] = action.res;

        return {
          results: { ...state.results, ...newFilter },
          loading: false,
          error: false
        };
      default:
        return state;
    }
  }
}

const filters = combineReducers({
  courses: createFilterWithNamedType(FilterConstants.BROWSE_FILTER_COURSE),
  cuisines: createFilterWithNamedType(FilterConstants.BROWSE_FILTER_CUISINE),
  ratings: createFilterWithNamedType(FilterConstants.BROWSE_FILTER_RATING),
});

export default filters
