import SearchConstants from '../constants/SearchConstants'

function search(state = { results: {}, loading: true }, action) {
  switch (action.type) {
    case SearchConstants.BROWSE_SEARCH_LOADING:
      return { ...state, loading: true };
    case SearchConstants.BROWSE_SEARCH_RESULTS:
      let newSearch = {};
      newSearch[action.qs] = {
        recipes: action.res.results,
        totalRecipes: action.res.count
      };

      return {
        results: { ...state.results, ...newSearch },
        loading: false
      };
    default:
      return state;
  }
}

export default search
