import MenuItemConstants from '../constants/MenuItemConstants'

const items = (state = null, action) => {
  switch (action.type) {
    case MenuItemConstants.MENU_ITEM_LOAD:
      return action.data;
    case MenuItemConstants.MENU_ITEM_CREATE:
        return [ ...state, { ...action.data }];
    case MenuItemConstants.MENU_ITEM_CREATE_BULK:
      return [ ...state, ...action.data ];
    case MenuItemConstants.MENU_ITEM_SAVE:
      return state.map(item =>
        item.id === action.data.id ? { ...action.data } : item
      );
    case MenuItemConstants.MENU_ITEM_DELETE:
      return state.filter(t => t.id !== action.id);
    case MenuItemConstants.MENU_ITEM_MENU_DELETE:
      return state.filter(t => t.menu !== action.id);
    default:
      return state;
  }
};

export default items
