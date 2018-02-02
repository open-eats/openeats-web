import MiniBrowseConstants from '../constants/MiniBrowseConstants'
import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config'

export const loadMiniBrowse = (filter) => {
  return dispatch => {
    request()
      .get(serverURLs.mini_browse + filter)
      .then(res => {
          dispatch({
            type: MiniBrowseConstants.MINIBROWSE_SEARCH_LOADING,
            results: res.body.results
          });
      })
  }
};
