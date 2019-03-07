import NewsConstants from '../constants/NewsConstants'

const lists = (state = {}, action) => {
  switch (action.type) {
    case NewsConstants.NEWS_LOAD:
      return { ...state, news: action.news };
    default:
      return state;
  }
};

export default lists
