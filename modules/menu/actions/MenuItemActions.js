import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config'
import MenuItemConstants from '../constants/MenuItemConstants';
import StatusConstants from '../constants/StatusConstants';

export const load = () => {
  return (dispatch) => {
    request()
      .get(serverURLs.menu_item)
      .then(res => dispatch({
        type: MenuItemConstants.MENU_ITEM_LOAD, data: res.body.results
      }))
      .catch(err => {
        dispatch({ type: StatusConstants.MENU_ITEM_ERROR });
      })
  }
};

export const save = (id, data) => {
  return (dispatch) => {
    dispatch({
      type: StatusConstants.MENU_STATUS_DISPLAY,
      message: 'Saving. Please wait...',
      alert: 'alert-info'
    });

    if (id != 0) {
      request()
        .patch(serverURLs.menu_item + id + '/')
        .send(data)
        .then(res => {
          dispatch({
            type: MenuItemConstants.MENU_ITEM_SAVE,
            data: res.body
          });
          dispatch({
            type: StatusConstants.MENU_STATUS_DISPLAY,
            message: 'Menu Item Saved!',
            alert: 'alert-success'
          });
        })
        .catch(err => {
          dispatch({
            type: StatusConstants.MENU_STATUS_DISPLAY,
            message: 'Menu Item failed to saved.',
            alert: 'alert-error'
          });
        })
    } else {
      request()
        .post(serverURLs.menu_item)
        .send(data)
        .then(res => {
          dispatch({
            type: MenuItemConstants.MENU_ITEM_CREATE,
            data: res.body
          });
          dispatch({
            type: StatusConstants.MENU_STATUS_DISPLAY,
            message: 'Menu Item Created!',
            alert: 'alert-success'
          });
        })
        .catch(err => {
          dispatch({
            type: StatusConstants.MENU_STATUS_DISPLAY,
            message: 'Menu Item failed to saved.',
            alert: 'alert-error'
          });
        })
    }
  }
};

export const remove = (id) => {
  return (dispatch) => {
    dispatch({
      type: StatusConstants.MENU_STATUS_DISPLAY,
      message: 'Deleting. Please wait...',
      alert: 'alert-info'
    });

    request()
      .delete(serverURLs.menu_item + id)
      .then(res => {
        dispatch({type: MenuItemConstants.MENU_ITEM_DELETE, id: id});
        dispatch({
          type: StatusConstants.MENU_STATUS_DISPLAY,
          message: 'Menu Item Removed!',
          alert: 'alert-success'
        });
      })
      .catch(err => {
        dispatch({
          type: StatusConstants.MENU_STATUS_DISPLAY,
          message: 'Menu Item failed to be deleted.',
          alert: 'alert-error'
        });
      })
  }
};
