import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config'
import ItemConstants from '../constants/ItemConstants';

export const load = (listId) => {
  return (dispatch) => {
    request()
      .get(serverURLs.list_item + '?list=' + listId)
      .then(res => {
        dispatch({
          type: ItemConstants.ITEM_INIT,
          listId: listId,
          items: res.body.results
        })
      })
      .catch(err => {
        console.error(err.toString());
      })
  }
};

/* Add a new object, with it's order at the end of the list
 */
export const add = (title, listLength, listId) => {
  return (dispatch) => {
    request()
      .post(serverURLs.list_item)
      .send({
        title: title,
        list: listId,
        order: listLength,
      })
      .end((err, res) => {
        if (!err && res) {
          dispatch({
            type: ItemConstants.ITEM_ADD,
            listId: listId,
            id: res.body.id,
            title: res.body.title,
            order: res.body.order,
          });
        } else {
          console.error(err.toString());
          console.error(res.body);
        }
      });
  }
};

export const save = (id, title, listId) => {
  return (dispatch) => {
    request()
      .patch(serverURLs.list_item + id + "/")
      .send({title: title})
      .end((err, res) => {
        if (!err && res) {
          dispatch({
            type: ItemConstants.ITEM_SAVE,
            listId: listId,
            id: id,
            title: res.body.title
          });
        } else {
          console.error(err.toString());
          console.error(res.body);
        }
      });
  }
};

export const toggle = (id, completed, listId) => {
  return (dispatch) => {
    request()
      .patch(serverURLs.list_item + id + "/")
      .send({completed: completed})
      .end((err, res) => {
        if (!err && res) {
          dispatch({
            type: ItemConstants.ITEM_TOGGLE,
            listId: listId,
            id: id,
          });
        } else {
          console.error(err.toString());
          console.error(res.body);
        }
      });
  }
};

export const toggleAll = (items, checked, listId) => {
  let ids = items.reduce(function (list, item) {
    if (item.completed !== checked) {
      list.push({
        id: item.id,
        completed: checked
      });
    }
    return list;
  }, []);

  return (dispatch) => {
    request()
      .patch(serverURLs.bulk_list_item)
      .send(ids)
      .end((err, res) => {
        if (!err && res) {
          dispatch({
            type: ItemConstants.ITEM_TOGGLE_ALL,
            listId: listId,
            ids: ids
          });
        } else {
          console.error(err.toString());
          console.error(res.body);
        }
      });
  }
};

/* Order all items in the order that they were passed in
 */
export const orderAll = (items, listId) => {
  let order = 0;
  let ids = items.map(item => ({
    id: item.id,
    order: order++,
  }));

  return (dispatch) => {
    request()
      .patch(serverURLs.bulk_list_item)
      .send(ids)
      .end((err, res) => {
        if (!err && res) {
          dispatch({
            type: ItemConstants.ITEM_ORDER_ALL,
            listId: listId,
            ids: ids
          });
        } else {
          console.error(err.toString());
          console.error(res.body);
        }
      });
  }
};

export const destroy = (id, listId) => {
  return (dispatch) => {
    request()
      .delete(serverURLs.list_item + id + "/")
      .end((err, res) => {
        if (!err && res) {
          dispatch({
            type: ItemConstants.ITEM_DELETE,
            id: id,
            listId: listId,
          });
        } else {
          console.error(err.toString());
          console.error(res.body);
        }
      });
  }
};

export const clearCompleted = (items, event, listId) => {
  let ids = items.reduce(function (list, item) {
    if (item.completed === true) {
      list.push(item.id);
    }
    return list;
  }, []);

  return (dispatch) => {
    request()
      .delete(serverURLs.bulk_list_item)
      .send(ids)
      .end((err, res) => {
        if (!err && res) {
          dispatch({
            type: ItemConstants.ITEM_DELETE_COMPLETED,
            listId: listId,
            ids: ids,
          });
        } else {
          console.error(err.toString());
          console.error(res.body);
        }
      });
  }
};
