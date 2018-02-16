import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config'
import MenuItemConstants from '../constants/MenuItemConstants';

export const load = () => {
  return (dispatch) => {
    request()
      .get(serverURLs.menu_item)
      .then(res => dispatch({type: MenuItemConstants.MENU_ITEM_LOAD, data: res.body.results}))
  }
};

export const save = (id, data) => {
  return (dispatch) => {
    if (id != 0) {
      request()
        .patch(serverURLs.menu_item + id + '/')
        .send(data)
        .then(res => dispatch({type: MenuItemConstants.MENU_ITEM_SAVE, data: res.body}))
    } else {
      request()
        .post(serverURLs.menu_item)
        .send(data)
        .then(res => dispatch({type: MenuItemConstants.MENU_ITEM_SAVE, data: res.body}))
    }
  }
};

export const remove = (id) => {
  return (dispatch) => {
    request()
      .delete(serverURLs.menu_item + id)
      .then(res => dispatch({type: MenuItemConstants.MENU_ITEM_DELETE, id: id}))
  }
};
