import { EventEmitter } from 'events';
import Dispatcher from './Dispatcher';
import ActionTypes from './ActionTypes';
 
const CHANGE = 'CHANGE';
const storage = window.localStorage;
const dataTypes = {LOCATIONS: 'locations', CATEGORIES: 'categories'};

class DataStore extends EventEmitter {
 
  constructor() {
      super();
      for (const key in dataTypes) {
        let data = JSON.parse(storage.getItem(dataTypes[key]));
        if (!data || data.nextId === undefined) {
          storage.setItem(dataTypes[key], JSON.stringify({ 'nextId': 0 }));
        }
      }
      this._registerToActions = this._registerToActions.bind(this);
      this._new = this._new.bind(this);
      this._edit = this._edit.bind(this);
      this._remove = this._remove.bind(this);
      this._getAll = this._getAll.bind(this);
      this._getItem = this._getItem.bind(this);
      this.getAllCategories = this.getAllCategories.bind(this);
      this.getAllLocations = this.getAllLocations.bind(this);
      this.getCategory = this.getCategory.bind(this);
      this.getLocation = this.getLocation.bind(this);
      this.addChangeListener = this.addChangeListener.bind(this);
      this.removeChangeListener = this.removeChangeListener.bind(this);
      // Registers action handler with the Dispatcher.
      Dispatcher.register(this._registerToActions);
  }

  // Switches over the action's type when an action is dispatched.
  _registerToActions(action) {
    switch(action.actionType) {
      case ActionTypes.NEW_LOCATION:
        this._new(action.payload, dataTypes.LOCATIONS);
        break;
      case ActionTypes.EDIT_LOCATION:
        this._edit(action.payload, dataTypes.LOCATIONS);
        break;
      case ActionTypes.REMOVE_LOCATION:
        this._remove(action.payload, dataTypes.LOCATIONS);
        break;
      case ActionTypes.NEW_CATEGORY:
        this._new(action.payload, dataTypes.CATEGORIES);
        break;
      case ActionTypes.EDIT_CATEGORY:
        this._edit(action.payload, dataTypes.CATEGORIES);
        break;
      case ActionTypes.REMOVE_CATEGORY:
        this._remove(action.payload, dataTypes.CATEGORIES);
        break;
    }
  }

  _new(item, type) {
    let data = JSON.parse(storage.getItem(type));
    let id = data.nextId;
    data.nextId = data.nextId + 1;
    item.id = id;
    data[id + ''] = item;
    storage.setItem(type, JSON.stringify(data));
    this.emit(CHANGE);
  }
  _edit(item, type) {
    let data = JSON.parse(storage.getItem(type));
    data[item.id] = item;
    storage.setItem(type, JSON.stringify(data));
    this.emit(CHANGE);
  }
  _remove(itemId, type) {
    let data = JSON.parse(storage.getItem(type));
    delete data[itemId];
    storage.setItem(type, JSON.stringify(data));
    this.emit(CHANGE);
  }

  // Returns the current store's state.
  _getAll(type) {
    let data = JSON.parse(storage.getItem(type));
    let all = [];
    for (const key in data) {
      if (key !== 'nextId') {
        const element = data[key];
        const newElement = {};
        for (const childKey in element) {
          if (element.hasOwnProperty(childKey)) {
            newElement[childKey] = element[childKey];
          }
        }
        all.push(newElement);
      }
    }
    return all;
  }
  _getItem(id, type) {
    let data = JSON.parse(storage.getItem(type));
    return data[id];
  }
  getAllLocations() {
    return this._getAll(dataTypes.LOCATIONS);
  }

  getLocation(locationId) {
    return this._getItem(locationId, dataTypes.LOCATIONS);
  }

  getAllCategories() {
    return this._getAll(dataTypes.CATEGORIES);
  }

  getCategory(categoryId) {
    return this._getItem(categoryId, dataTypes.CATEGORIES);
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

export default new DataStore;