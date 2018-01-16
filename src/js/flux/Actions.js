import Dispatcher from './Dispatcher';
import ActionTypes from './ActionTypes';
 
class Actions {
  locationsView() {
    dispatcher.dispatch({
      actionType: ActionTypes.LOCATIONS_VIEW,
      payload: null
    });
  }
  newLocation(item) {
    Dispatcher.dispatch({
      actionType: ActionTypes.NEW_LOCATION,
      payload: item 
    });
  }
  updateLocation(item) {
    Dispatcher.dispatch({
      actionType: ActionTypes.UPDATE_LOCATION,
      payload: item 
    });
  }
  removeLocation(item) {
    Dispatcher.dispatch({
      actionType: ActionTypes.REMOVE_LOCATION,
      payload: item 
    });
  }
  categoriesView() {
    dispatcher.dispatch({
      actionType: ActionTypes.CATEGORIES_VIEW,
      payload: null
    });
  }
  newCategory(item) {
    Dispatcher.dispatch({
      actionType: ActionTypes.NEW_CATEGORY,
      payload: item 
    });
  }
  updateCategory(item) {
    Dispatcher.dispatch({
      actionType: ActionTypes.UPDATE_CATEGORY,
      payload: item 
    });
  }
  removeCategory(item) {
    Dispatcher.dispatch({
      actionType: ActionTypes.REMOVE_CATEGORY,
      payload: item
    });
  }
  itemView() {
    Dispatcher.dispatch({
      actionType: ActionTypes.ITEM_VIEW,
      payload: null
    });
  }
  newItemView() {
    Dispatcher.dispatch({
      actionType: ActionTypes.NEW_ITEM_VIEW,
      payload: null
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