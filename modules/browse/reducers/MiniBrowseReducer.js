import MiniBrowseReducer from '../constants/MiniBrowseConstants'

function search(state = [], action) {
  switch (action.type) {
    case MiniBrowseReducer.MINIBROWSE_SEARCH_LOADING:
      return action.results;
    default:
      return state;
  }
}

export default search
