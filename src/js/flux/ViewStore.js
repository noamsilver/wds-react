import { EventEmitter } from 'events';
import Dispatcher from './Dispatcher';
import ActionTypes from './ActionTypes';
import constants from '../constants';
 
const CHANGE = 'CHANGE';
var storage = {};
const dataTypes = { CURRENT_VIEW: 'currentView' };
 
class ViewStore extends EventEmitter {
 
  constructor() {
      super();
      storage = {
        view: constants.LOCATIONS,
        itemId: null,
        item: false,
        newItem: false,
        edit: false
      };

      // Registers action handler with the Dispatcher.
      Dispatcher.register(this._registerToActions.bind(this));
  }

  // Switches over the action's type when an action is dispatched.
  _registerToActions(action) {
    const current = this.getCurrentView();
    switch(action.actionType) {
      case ActionTypes.LOCATIONS_VIEW:
        this._updateView(constants.LOCATIONS, action.payload, false, false, false);
        break;
      case ActionTypes.CATEGORIES_VIEW:
        this._updateView(constants.CATEGORIES, action.payload, false, false, false);
        break;
      case ActionTypes.ITEM_VIEW:
        this._updateView(current.view, action.payload, true, false, false);
        break;
      case ActionTypes.NEW_ITEM_VIEW:
        this._updateView(current.view, action.payload, false, true, false);
        break;
      case ActionTypes.EDIT_ITEM_VIEW:
        this._updateView(current.view, action.payload, false, false, true);
        break;
      case ActionTypes.CLOSE_ITEM_VIEW:
        this._updateView(current.view, action.payload, false, false, false);
        break;
    }
  }

  _updateView(view, itemId, item, newItem, edit) {
    storage = {
      view: view,
      itemId: itemId,
      item: item,
      newItem: newItem,
      edit: edit
    };
    this.emit(CHANGE);
  }

  // Returns the current store's state.
  getCurrentView() {
    return storage;
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