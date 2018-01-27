import ItemConstants from '../constants/ItemConstants'

const items = (state = [], action) => {
  switch (action.type) {
    case ItemConstants.ITEM_INIT:
      return action.items.map(listItem => {
        return { ...listItem }
      });
    case ItemConstants.ITEM_ADD:
      return [
        ...state,
        { ...action, completed: false }
      ];
    case ItemConstants.ITEM_SAVE:
      return state.map(item =>
        item.id === action.id ?
          { ...item, title: action.title } :
          item
      );
    case ItemConstants.ITEM_TOGGLE:
      return state.map(item =>
        item.id === action.id ?
          { ...item, completed: !item.completed } :
          item
      );
    case ItemConstants.ITEM_TOGGLE_ALL:
      let ids = [];
      for (let i in action.ids) {
        ids.push(action.ids[i].id)
      }

      return state.map(item =>
        ids.indexOf(item.id) > -1 ?
          { ...item, completed: !item.completed } :
          item
      );
    case ItemConstants.ITEM_DELETE:
      return state.filter(t => t.id !== action.id);
    case ItemConstants.ITEM_DELETE_COMPLETED:
      return state.filter(t => !(action.ids.indexOf(t.id) > -1));
    default:
      return state
  }
};

export default items
