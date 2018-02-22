import MenuConstants from '../constants/MenuConstants'

const items = (state = [], action) => {
  switch (action.type) {
    case MenuConstants.MENU_LOAD:
      return action.data;
    case MenuConstants.MENU_ADD:
      console.log(action)
      return [ ...state, { ...action.data }];
    case MenuConstants.MENU_SAVE:
      return state.map(item =>
        item.id === action.data.id ? { ...action.data } : item
      );
    case MenuConstants.MENU_DELETE:
      return state.filter(t => t.id !== action.id);
    default:
      return state;
  }
};

export default items