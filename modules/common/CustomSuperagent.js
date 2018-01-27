import defaults from 'superagent-defaults'
import store from './store'

// Create a defaults context

let request = function() {
  let customRequest = defaults();

  // Setup some defaults
  customRequest.set('Accept', 'application/json');
  // Add the user token if the user is logged in
  const user = store.getState().user;
  if (user.id) {
    customRequest.set('Authorization', 'Token ' + user.token);
  }

  return customRequest;
};

module.exports.request = request;
