import defaults from 'superagent-defaults'
import superRequest from 'superagent'
import jwtDecode from 'jwt-decode'
import moment from 'moment'

import store from './store'
import history from './history'
import { serverURLs } from './config'


const refreshToken = (() => {
  let blocking = false;

  const refresh = (token) => {
    superRequest
      .post(serverURLs.refresh_token)
      .set('Accept', 'application/json')
      .send({'token': token})
      .then(res => {
        blocking = false;
        store.dispatch({type: 'LOGIN_USER', user: res.body});
      })
      .catch(err => {
        blocking = false;
        store.dispatch({type: 'LOGOUT_USER'});
        history.push('/login');
      })
  };

  return {
    instance: (token) => {
      if (!blocking) {
        blocking = true;
        refresh(token)
      }
    }
  };
})();

// Create a defaults context
export const request = () => {
  let customRequest = defaults();

  // Add the user token if the user is logged in
  const user = store.getState().user;
  if (user.id) {
    const decodedToken = jwtDecode(user.token);
    // Check if the user's token is outdated.
    // The token expired after 14 days.
    // See: https://github.com/open-eats/openeats-api/blob/master/base/settings.py#L174
    if (moment(new Date()).add(10, 'days') > moment.unix(decodedToken.exp)) {
      // If it is then call for a refreshed token.
      // If the token is to old, the request will fail and
      // the user will be logged-out and redirect to the login screen.
      refreshToken.instance(user.token);
    }
    customRequest.set('Authorization', 'JWT ' + user.token);
  }

  // Make sure every request we get is json
  customRequest.set('Accept', 'application/json');

  return customRequest;
};
