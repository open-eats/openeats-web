import NewsConstants from '../constants/NewsConstants'

const lists = (state = {}, action) => {
  switch (action.type) {
    case NewsConstants.NEWS_LOAD:
      return { ...state, news: action.news };
    case NewsConstants.NEWS_MENU_ITEM_LOAD:
      return { ...state, menuItems: action.items };
    case NewsConstants.NEWS_MENU_ITEM_COMPLETE:
      return { ...state, menuItems: state.menuItems.filter(x => x.id !== action.id) };
    default:
      return state;
  }
};

export default lists
