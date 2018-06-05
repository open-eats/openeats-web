import StatusConstants from '../constants/StatusConstants';

export const close = () => {
  return (dispatch) => {
    dispatch({ type: StatusConstants.MENU_STATUS_REMOVE });
  }
};
