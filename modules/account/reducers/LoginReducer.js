import AuthConstants from '../constants/AuthConstants'

const status = (state = { id: 0 }, action) => {
  switch (action.type) {
    case AuthConstants.LOGIN_USER:
      const user = JSON.stringify(action.user);
      localStorage.setItem('user', user);
      return { ...action.user };
    case AuthConstants.LOGIN_ERROR:
      return { id: 0, error: action.error };
    case AuthConstants.LOGOUT_USER:
      localStorage.removeItem('user');
      return { id: 0 };
    default:
      return state
  }
};

export default status
