import StatusConstants from '../constants/StatusConstants';

export const close = () => {
  return (dispatch) => {
    dispatch({ type: StatusConstants.RECIPE_FROM_STATUS_REMOVE });
  }
};
