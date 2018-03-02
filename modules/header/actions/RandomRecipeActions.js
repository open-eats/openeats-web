import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config'
import history from '../../common/history'

export const randomRecipe = () => {
  return (dispatch) => {
    request()
      .get(serverURLs.mini_browse + '?limit=1&fields=slug')
      .then(res => { history.push('/recipe/' + res.body.results[0].slug) })
      .catch(err => { console.error(err); })
  }
};