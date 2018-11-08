import StatusConstants from '../constants/StatusConstants'

const status = (state = { message: '', alert: '' }, action) => {
  switch (action.type) {
    case StatusConstants.MENU_STATUS_DISPLAY:
      return { message: action.message, alert: action.alert };
    case StatusConstants.MENU_STATUS_REMOVE:
      return { message: '', alert: '' };
    default:
      return state;
  }
};

export default status
