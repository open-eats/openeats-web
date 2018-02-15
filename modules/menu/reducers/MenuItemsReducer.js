import MenuItemConstants from '../constants/MenuItemConstants'

const items = (state = [], action) => {
  switch (action.type) {
    case MenuItemConstants.MENU_ITEM_LOAD:
      return action.data;
    case MenuItemConstants.MENU_ITEM_SAVE:
      if (state.find(t => t.id == action.data.id)) {
        return state.map(item =>
          item.id === action.data.id ? { ...action.data } : item
        );
      }
      else {
        return [ ...state, { ...action }]
      }
    case MenuItemConstants.MENU_ITEM_DELETE:
      return state.filter(t => t.id !== action.id);
    default:
      return state
  }
};

export default items
