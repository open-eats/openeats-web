import ListConstants from '../constants/ListConstants'
import ItemConstants from '../constants/ItemConstants'
import { default as items } from './ItemReducer'

const lists = (state = [], action) => {
  switch (action.type) {
    case ListConstants.LIST_INIT:
      return action.lists.map(list => {
        let items = state.find(t => t.id === list.id);
        items = items ? items.items : [];
        return {...list, items: items}
      });
    case ListConstants.LIST_ADD:
      return [
        ...state,
        { ...action, items: [] }
      ];
    case ListConstants.LIST_SAVE:
      return state.map(list =>
        list.id === action.id ?
          { ...list, title: action.title } :
          list
      );
    case ListConstants.LIST_DELETE:
      return state.filter(t => t.id !== action.id);
    case (action.type.indexOf(ItemConstants.ITEM_INDEX) !== -1 ? action.type : '') :
      return state.map(list => {
        if (list.id == action.list){
          let newItems = items(list.items, action);
          return { ...list, items: newItems, item_count: newItems.length };
        }
        return list;
      });
    default:
      return state
  }
};

export default lists
