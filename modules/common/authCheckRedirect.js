import history from './history'
import store from './store'

const authCheckRedirect = () => {
  if (!store.getState().user.id) {
    history.replace('/login');
  }
};

export default authCheckRedirect
