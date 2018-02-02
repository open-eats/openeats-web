import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config'
import NewsConstants from '../constants/NewsConstants';

export const load = () => {
  return (dispatch) => {
    let url = serverURLs.news;
    request()
      .get(serverURLs.news)
      .then(res => {
        dispatch({
          type: NewsConstants.NEWS_LOAD,
          news: res.body.results
        })
      })
      .catch(err => {
        console.error(err.toString());
      })
  }
};
