import React, { Component } from 'react';
import DataStore from '../flux/DataStore';
import Actions from '../flux/Actions';
import constants from '../constants';
import '../../styles/item.css';

class ItemView extends Component {
  constructor(props) {
    super(props);
    const params = this.props.match.params;
    const isNew = params.action === constants.NEW;
    const isLocation = params.view === constants.LOCATIONS;
    const item = isNew ? undefined : isLocation ? DataStore.getLocation(params.item) : DataStore.getCategory(params.item);
    const categories = isLocation && DataStore.getAllCategories();
    this.state = {
      item,
      name: item && item.name,
      address: item && isLocation && item.address,
      coordinates: item && isLocation && item.coordinates.lat + ', ' + item.coordinates.lng,
      category: item && isLocation && item.category,
      categories,
      message: undefined
    };
    this.updateData = this.updateData.bind(this);
    this.updateView = this.updateView.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveItem = this.saveItem.bind(this);
  }
  componentWillMount() {
    DataStore.addChangeListener(this.updateData);
    this.updateView(this.props.match.params);
  }
  componentWillReceiveProps(nextProps) {
    const params = nextProps.match.params;
    const isNew = params.action === constants.NEW;
    const isLocation = params.view === constants.LOCATIONS;
    const item = isNew ? undefined : isLocation ? DataStore.getLocation(params.item) : DataStore.getCategory(params.item);
    const categories = isLocation && DataStore.getAllCategories();
    this.setState({
      item,
      name: item && item.name,
      address: item && isLocation && item.address,
      coordinates: item && isLocation && item.coordinates.lat + ', ' + item.coordinates.lng,
      category: item && isLocation && item.category,
      categories,
      message: undefined
    });
    this.updateView(nextProps.match.params);
  }
  componentWillUnmount() {
    DataStore.removeChangeListener(this.updateData);
  }
  updateView(params) {
    if (params.action === constants.NEW) {
      Actions.newItemView();
    } else if (params.item) {
      if (params.action === constants.VIEW) {
        Actions.itemView(params.item);
      } else if (params.action === constants.EDIT) {
        Actions.editItemView(params.item);
      }
    }
  }
  updateData() {
    const params = this.props.match.params;
    const isNew = params.action === constants.NEW;
    const isLocation = params.view === constants.LOCATIONS;
    const item = isNew ? undefined : isLocation ? DataStore.getLocation(params.item) : DataStore.getCategory(params.item);
    const categories = isLocation && DataStore.getAllCategories();
    this.setState({
      item,
      name: item && item.name,
      address: item && isLocation && item.address,
      coordinates: item && isLocation && item.coordinates,
      category: item && isLocation && item.category,
      categories
    })
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      message: undefined
    });
  }
  getLatLng(value) {
    let captureRegex = /(-?\d+\.?\d+)[^0-9-]+(-?\d+\.?\d+)/g;
    let capture = captureRegex.exec(value);
    return {
      lat: capture && capture[1] && parseFloat(capture[1]) >= -90 && parseFloat(capture[1]) <= 90 && parseFloat(capture[1]),
      lng: capture && capture[2] && parseFloat(capture[2]) >= -180 && parseFloat(capture[2]) <= 180 && parseFloat(capture[2])
    };
  }
  saveItem(event) {
    const state = this.state;
    const params = this.props.match.params;
    const isNew = params.action === constants.NEW;
    const isLocation = params.view === constants.LOCATIONS;
    let isCompleate = state.name && state.name.length > 0;
    let latLng = undefined;
    if (isCompleate && isLocation) {
      latLng = this.getLatLng(state.coordinates);
      isCompleate =  
        state.address && state.address.length > 0 && 
        state.coordinates && latLng && latLng.lat && latLng.lng && 
        state.category && state.category.length > 0;
    }
    if (isCompleate) {
      const item = {
        name: state.name        
      }
      if (isLocation) {
        item.name = state.name;
        item.address = state.address;
        item.coordinates = latLng;
        item.category = state.category;
      }
      if (!isNew) {
        item.id = state.item.id;
      }

      if (isNew) {
        if (isLocation)  {
          Actions.newItem(item, constants.LOCATIONS);
        } else {
          Actions.newItem(item, constants.CATEGORIES);
        }
      } else {
        if (isLocation)  {
          Actions.editItem(item, constants.LOCATIONS);
        } else {
          Actions.editItem(item, constants.CATEGORIES);
        }
      }
      this.props.history.push('/' + params.view);
    } else {
      this.setState({
        message: 'Please complete all fields'
      });
    }
  }
  render() {
    const params = this.props.match.params;
    const isNewItem = params.action === constants.NEW;
    const isViewItem = params.action === constants.VIEW;
    const isEditItem = params.action === constants.EDIT;
    const isLocation = params.view === constants.LOCATIONS;
    let displayItem = undefined;
    if (isViewItem) {
      displayItem = 
        <div id="view">
          {isLocation && 
            <div>
              <div className="address line"><div>Address</div>{this.state.address}</div>
              <div className="coordinates line"><div>Coordinates</div>{this.state.coordinates}</div>
              <div className="category line"><div>Category</div>{this.state.category}</div>
            </div>
          }
          {!isLocation && 
            <div className="name line"><div>Name</div>{this.state.name}</div>
          }
        </div>;
    } else {
      displayItem = 
      <div id="edit">
        <label><div>Name</div>
          <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
        </label>
        {isLocation && 
          <div>
            <label><div>Address</div>
              <input type="text" name="address" value={this.state.address} onChange={this.handleChange}/>
            </label>
            <label><div>Coordinates</div>
              <input type="text" name="coordinates" value={this.state.coordinates} onChange={this.handleChange}/>
            </label>
            {this.state.categories && this.state.categories.length === 0 && <div>Please create categories before you can add a location</div>}
            {this.state.categories && this.state.categories.length > 0 && 
              <label><div>Category</div>
                <select name="category" value={this.state.category} onChange={this.handleChange}>
                  <option key="-1"></option>
                  {this.state.categories.map(item => <option key={item.id} value={item.name}>{item.name}</option>)}
                </select>
              </label>
            }
          </div>
        }
        <div className="save button" onClick={this.saveItem}>Save</div>
      </div>
    }
    return (
      <div id="item" className="content">
        {(isViewItem || isEditItem) && <h2>{isLocation ? this.state.item.name : 'Category'}</h2>}
        {isNewItem && <h2>New {isLocation ? 'Location' : 'Category'}</h2>}
        {displayItem}
        {this.state.message && <div className="message">{this.state.message}</div>}
      </div>
    );
  }
}

export default ItemView;