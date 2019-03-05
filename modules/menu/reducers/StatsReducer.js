import MenuItemConstants from '../constants/MenuItemConstants'

const stats = (state = null, action) => {
  switch (action.type) {
    case MenuItemConstants.MENU_ITEM_LOAD_STATS:
      return action.data;
    default:
      return state;
  }
};

export default stats
