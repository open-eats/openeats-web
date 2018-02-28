import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config'
import MenuConstants from '../constants/MenuConstants';
import MenuItemConstants from '../constants/MenuItemConstants';
import history from '../../common/history'
import qs from 'query-string'
import StatusConstants from "../constants/StatusConstants";

const changeUrl = id => {
  let parsed = qs.parse(window.location.search);
  if (id) {
    parsed['menu'] = id;
  } else {
    delete parsed['menu'];
  }
  history.push('/menu/?' + qs.stringify(parsed));
};

export const load = () => {
  return (dispatch) => {
    request()
      .get(serverURLs.menu)
      .then(res => dispatch({type: MenuConstants.MENU_LOAD, data: res.body.results}))
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
        .patch(serverURLs.menu + id + '/')
        .send(data)
        .then(res => {
          dispatch({
            type: MenuConstants.MENU_SAVE,
            data: res.body
          });
          dispatch({
            type: StatusConstants.MENU_STATUS_DISPLAY,
            message: 'Menu Saved!',
            alert: 'alert-success'
          });
        })
        .catch(err => {
          dispatch({
            type: StatusConstants.MENU_STATUS_DISPLAY,
            message: 'Menu failed to saved.',
            alert: 'alert-error'
          });
        })
    } else {
      request()
        .post(serverURLs.menu)
        .send(data)
        .then(res => {
          dispatch({
            type: MenuConstants.MENU_ADD,
            data: res.body
          });
          dispatch({
            type: StatusConstants.MENU_STATUS_DISPLAY,
            message: 'Menu Created!',
            alert: 'alert-success'
          });
          changeUrl(res.body.id);
        })
        .catch(err => {
          dispatch({
            type: StatusConstants.MENU_STATUS_DISPLAY,
            message: 'Menu failed to saved.',
            alert: 'alert-error'
          });
        })
    }
  }
};

export const copy = (id, data) => {
  return (dispatch) => {
    dispatch({
      type: StatusConstants.MENU_STATUS_DISPLAY,
      message: 'Saving. Please wait...',
      alert: 'alert-info'
    });

    data['menu'] = id;
    request()
      .post(serverURLs.menuCopy)
      .send(data)
      .then(res => {
        dispatch({
          type: MenuConstants.MENU_ADD,
          data: res.body.menu
        });
        dispatch({
          type: MenuItemConstants.MENU_ITEM_CREATE_BULK,
          data: res.body.items
        });
        dispatch({
          type: StatusConstants.MENU_STATUS_DISPLAY,
          message: 'Menu Created!',
          alert: 'alert-success'
        });
        changeUrl(res.body.menu.id);
      })
      .catch(err => {
        dispatch({
          type: StatusConstants.MENU_STATUS_DISPLAY,
          message: 'Menu failed to saved.',
          alert: 'alert-error'
        });
      })
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
      .delete(serverURLs.menu + id)
      .then(res => {
        dispatch({type: MenuConstants.MENU_DELETE, id: id});
        dispatch({type: MenuItemConstants.MENU_ITEM_MENU_DELETE, id: id});
        dispatch({
          type: StatusConstants.MENU_STATUS_DISPLAY,
          message: 'Menu Removed!',
          alert: 'alert-success'
        });
        changeUrl();
      })
      .catch(err => {
        dispatch({
          type: StatusConstants.MENU_STATUS_DISPLAY,
          message: 'Menu failed to be deleted.',
          alert: 'alert-error'
        });
      })
  }
};
