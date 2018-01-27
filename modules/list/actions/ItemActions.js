import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config'
import ItemConstants from '../constants/ItemConstants';

export const load = (list) => {
  return (dispatch) => {
    request()
      .get(serverURLs.list_item + '?list=' + list)
      .then(res => {
        dispatch({
          type: ItemConstants.ITEM_INIT,
          list: list,
          items: res.body.results
        })
      })
      .catch(err => {
        console.error(err.toString());
      })
  }
};

export const add = (title, list) => {
  return (dispatch) => {
    request()
      .post(serverURLs.list_item)
      .send({
        title: title,
        list: list
      })
      .end((err, res) => {
        if (!err && res) {
          dispatch({
            type: ItemConstants.ITEM_ADD,
            list: list,
            id: res.body.id,
            title: res.body.title
          });
        } else {
          console.error(err.toString());
          console.error(res.body);
        }
      });
  }
};

export const save = (id, title, list) => {
  return (dispatch) => {
    request()
      .patch(serverURLs.list_item + id + "/")
      .send({title: title})
      .end((err, res) => {
        if (!err && res) {
          dispatch({
            type: ItemConstants.ITEM_SAVE,
            list: list,
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

export const toggle = (id, completed, list) => {
  return (dispatch) => {
    request()
      .patch(serverURLs.list_item + id + "/")
      .send({completed: completed})
      .end((err, res) => {
        if (!err && res) {
          dispatch({
            type: ItemConstants.ITEM_TOGGLE,
            list: list,
            id: id,
          });
        } else {
          console.error(err.toString());
          console.error(res.body);
        }
      });
  }
};

export const toggleAll = (items, checked, list) => {
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
            list: list,
            ids: ids
          });
        } else {
          console.error(err.toString());
          console.error(res.body);
        }
      });
  }
};

export const destroy = (id, list) => {
  return (dispatch) => {
    request()
      .delete(serverURLs.list_item + id + "/")
      .end((err, res) => {
        if (!err && res) {
          dispatch({
            type: ItemConstants.ITEM_DELETE,
            id: id,
            list: list,
          });
        } else {
          console.error(err.toString());
          console.error(res.body);
        }
      });
  }
};

export const clearCompleted = (items, event, list) => {
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
            list: list,
            ids: ids,
          });
        } else {
          console.error(err.toString());
          console.error(res.body);
        }
      });
  }
};
