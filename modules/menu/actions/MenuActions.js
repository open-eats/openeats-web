import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config'
import MenuConstants from '../constants/MenuConstants';
import history from '../../common/history'
import qs from 'query-string'

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
          });
          changeUrl(res.body.id);
        })
    }
  }
};

export const remove = (id) => {
  return (dispatch) => {
    request()
      .delete(serverURLs.menu + id)
      .then(res => {
        dispatch({type: MenuConstants.MENU_DELETE, id: id});
        changeUrl();
      })
  }
};
