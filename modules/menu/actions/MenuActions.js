import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config'
import MenuConstants from '../constants/MenuConstants';
import MenuItemConstants from "../constants/MenuItemConstants";

export const load = () => {
  return (dispatch) => {
    request()
      .get(serverURLs.menu)
      .then(res => dispatch({type: MenuConstants.MENU_LOAD, data: res.body.results}))
  }
};

export const save = (id, data) => {
  return (dispatch) => {
    // TODO add a better check ot see if the reicpe has been updated.
    // right now we are just making sure that it's a int
    if ((typeof data.recipe) === 'string') {
      delete data.recipe;
    }

    if (id != 0) {
      request()
        .patch(serverURLs.menu + id + '/')
        .send(data)
        .then(res => dispatch({
            type: MenuConstants.MENU_SAVE,
            data: res.body
        }))
    } else {
      request()
        .post(serverURLs.menu)
        .send(data)
        .then(res => {
          dispatch({
            type: MenuConstants.MENU_ADD,
            data: res.body
          })
        })
    }
  }
};

export const remove = (id) => {
  return (dispatch) => {
    request()
      .delete(serverURLs.menu + id)
      .then(res => dispatch({type: MenuConstants.MENU_DELETE, id: id}))
  }
};
