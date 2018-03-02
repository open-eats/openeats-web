import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config'
import ListConstants from '../constants/ListConstants';
import history from '../../common/history'

export const add = (title) => {
  return (dispatch) => {
    request()
      .post(serverURLs.list)
      .send({title: title})
      .end((err, res) => {
        if (!err && res) {
          dispatch({
            type: ListConstants.LIST_ADD,
            data: res.body
          });
          history.push('/list/' + res.body.slug);
        } else {
          console.error(err.toString());
        }
      });
  }
};

export const save = (id, slug, title) => {
  return (dispatch) => {
    request()
      .patch(serverURLs.list + slug + "/")
      .send({title: title})
      .end((err, res) => {
        if (!err && res) {
          dispatch({
            type: ListConstants.LIST_SAVE,
            id: id,
            title: res.body.title
          });
        } else {
          console.error(err.toString());
        }
      });
  }
};

export const destroy = (id, slug) => {
  return (dispatch) => {
    request()
      .delete(serverURLs.list + slug + "/")
      .end((err, res) => {
        if (!err && res) {
          history.push('/list/');
          dispatch({
            type: ListConstants.LIST_DELETE,
            id: id,
          });
        } else {
          console.error(err.toString());
        }
      });
  }
};

export const load = () => {
  return (dispatch) => {
    request()
      .get(serverURLs.list)
      .end((err, res) => {
        if (!err && res) {
          dispatch({
            type: ListConstants.LIST_INIT,
            lists: res.body.results,
          });
        } else {
          console.error(err.toString());
        }
      });
  }
};
