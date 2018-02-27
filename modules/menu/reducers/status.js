import StatusConstants from '../constants/StatusConstants'

const status = (state = '', action) => {
  switch (action.type) {
    case StatusConstants.MENU_STATUS_REMOVE:
      return StatusConstants.MENU_STATUS_REMOVE;
    case StatusConstants.MENU_SUCCESS:
      return StatusConstants.MENU_SUCCESS;
    case StatusConstants.MENU_ERROR:
      return StatusConstants.MENU_ERROR;
    case StatusConstants.MENU_WARNING:
      return StatusConstants.MENU_WARNING;
    case StatusConstants.MENU_ITEM_SUCCESS:
      return StatusConstants.MENU_ITEM_SUCCESS;
    case StatusConstants.MENU_ITEM_ERROR:
      return StatusConstants.MENU_ITEM_ERROR;
    case StatusConstants.MENU_ITEM_WARNING:
      return StatusConstants.MENU_ITEM_WARNING;
    default:
      return state;
  }
};

export default status
