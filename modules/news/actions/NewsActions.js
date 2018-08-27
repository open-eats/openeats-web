import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config'
import NewsConstants from '../constants/NewsConstants';

export const load = () => {
  return (dispatch) => {
    request()
      .get(serverURLs.news)
      .then(res => {
        dispatch({
          type: NewsConstants.NEWS_LOAD,
          news: res.body.results
        })
      })
  }
};

export const loadUpcomingMenuItems = () => {
  return (dispatch) => {
    request()
      .get(serverURLs.menu_item + '?date=2018/01/01')
      .then(res => dispatch({
        type: NewsConstants.NEWS_MENU_ITEM_LOAD,
        items: res.body.results
      }))
  }
};
