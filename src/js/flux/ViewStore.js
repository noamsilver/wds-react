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
      storage.setItem(dataTypes.CURRENT_VIEW, constants.LOCATIONS);

      // Registers action handler with the Dispatcher.
      Dispatcher.register(this._registerToActions.bind(this));
  }

  // Switches over the action's type when an action is dispatched.
  _registerToActions(action) {
    switch(action.actionType) {
      case ActionTypes.LOCATIONS_VIEW:
        _updateView(constants.LOCATIONS);
        break;
      case ActionTypes.CATEGORIES_VIEW:
        _updateView(constants.CATEGORIES);
        break;
    }
  }

  _updateView(view) {
    storage.setItem(dataTypes.CURRENT_VIEW, view);
    this.emit(CHANGE);
  }

  // Returns the current store's state.
  getCurrentView() {
    return storage.getItem(dataTypes.CURRENT_VIEW);
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