import MenuConstants from '../constants/MenuConstants'

const items = (state = [], action) => {
  switch (action.type) {
    case MenuConstants.MENU_LOAD:
      return action.data;
    // case MenuItemConstants.MENU_ITEM_ADD:
    //   return [
    //     ...state,
    //     { ...action, completed: false }
    //   ];
    // case MenuItemConstants.MENU_ITEM_SAVE:
    //   return state.map(item =>
    //     item.id === action.id ?
    //       { ...item, title: action.title } :
    //       item
    //   );
    // case MenuItemConstants.MENU_ITEM_DELETE:
    //   return state.filter(t => t.id !== action.id);
    default:
      return state
  }
};

export default items