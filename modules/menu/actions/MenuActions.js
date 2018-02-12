import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config'
import MenuConstants from '../constants/MenuConstants';

export const load = () => {
  return (dispatch) => {
    request()
      .get(serverURLs.menu)
      .then(res => dispatch({type: MenuConstants.MENU_LOAD, data: res.body.results}))
  }
};
