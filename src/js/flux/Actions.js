import Dispatcher from './Dispatcher';
import ActionTypes from './ActionTypes';
import constants from '../constants';
 
class Actions {
  newItem(item, type) {
    Dispatcher.dispatch({
      actionType: type === constants.LOCATIONS ? ActionTypes.NEW_LOCATION : ActionTypes.NEW_CATEGORY,
      payload: item 
    });
  }
  editItem(item, type) {
    Dispatcher.dispatch({
      actionType: type === constants.LOCATIONS ? ActionTypes.EDIT_LOCATION : ActionTypes.EDIT_CATEGORY,
      payload: item 
    });
  }
  removeItem(itemId, type) {
    Dispatcher.dispatch({
      actionType: type === constants.LOCATIONS ? ActionTypes.REMOVE_LOCATION : ActionTypes.REMOVE_CATEGORY,
      payload: itemId
    });
  }
  changeView(type) {
    Dispatcher.dispatch({
      actionType: type === constants.LOCATIONS ? ActionTypes.LOCATIONS_VIEW : ActionTypes.CATEGORIES_VIEW,
      payload: null
    });
  }
  itemView(itemId) {
    Dispatcher.dispatch({
      actionType: ActionTypes.ITEM_VIEW,
      payload: itemId
    });
  }
  newItemView() {
    Dispatcher.dispatch({
      actionType: ActionTypes.NEW_ITEM_VIEW,
      payload: null
    });
  }
  editItemView(itemId) {
    Dispatcher.dispatch({
      actionType: ActionTypes.EDIT_ITEM_VIEW,
      payload: itemId 
    });
  }
  closeItemView() {
    Dispatcher.dispatch({
      actionType: ActionTypes.CLOSE_ITEM_VIEW,
      payload: null
    });
  }
}

export default new Actions();