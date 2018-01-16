import { EventEmitter } from 'events';
import Dispatcher from './Dispatcher';
import ActionTypes from './ActionTypes';
import constants from '../constants';
 
const CHANGE = 'CHANGE';
const storage = window.localStorage
const dataTypes = { CURRENT_VIEW: 'currentView' }
 
class ViewStore extends EventEmitter {
 
  constructor() {
      super();
      storage.setItem(dataTypes.CURRENT_VIEW, JSON.stringify({
        view: constants.LOCATIONS,
        item: false,
        edit: false
      }));

      // Registers action handler with the Dispatcher.
      Dispatcher.register(this._registerToActions.bind(this));
  }

  // Switches over the action's type when an action is dispatched.
  _registerToActions(action) {
    const current = getCurrentView()
    switch(action.actionType) {
      case ActionTypes.LOCATIONS_VIEW:
        _updateView(constants.LOCATIONS, current.item, current.edit);
        break;
      case ActionTypes.CATEGORIES_VIEW:
        _updateView(constants.CATEGORIES, current.item, current.edit);
        break;
      case ActionTypes.ITEM_VIEW:
        _updateView(current.view, true, false);
        break;
      case ActionTypes.NEW_ITEM_VIEW:
        _updateView(current.view, false, true);
        break;
      case ActionTypes.CLOSE_ITEM_VIEW:
        _updateView(current.view, false, false);
        break;
    }
  }

  _updateView(view, item, edit) {
    storage.setItem(dataTypes.CURRENT_VIEW, JSON.stringify({
      view: view,
      item: item,
      edit: edit
    }));
    this.emit(CHANGE);
  }

  // Returns the current store's state.
  getCurrentView() {
    return JSON.parse(storage.getItem(dataTypes.CURRENT_VIEW));
  }


  // Hooks a React component's callback to the CHANGED event.
  addChangeListener(callback) {
    this.on(CHANGE, callback);
  }

  // Removes the listener from the CHANGED event.
  removeChangeListener(callback) {
    this.removeListener(CHANGE, callback);
  }
}

export default new ViewStore;