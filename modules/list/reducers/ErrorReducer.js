import ErrorConstants from '../constants/ErrorConstants'

const lists = (state = '', action) => {
  switch (action.type) {
    case ErrorConstants.LIST_ERROR_ADD:
      return action.error;
    case ErrorConstants.LIST_ERROR_REMOVE:
      return '';
    default:
      return state
  }
};

export default lists
