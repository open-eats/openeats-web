import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config'
import history from '../../common/history'

export const randomRecipe = () => {
  return (dispatch) => {
    request()
      .get(serverURLs.mini_browse + '?limit=1&fields=id')
      .then(res => { history.push('/recipe/' + res.body.results[0].id) })
      .catch(err => { console.error(err); })
  }
};