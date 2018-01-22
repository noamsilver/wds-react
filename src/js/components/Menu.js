import React, { Component } from 'react';
import ViewStore from '../flux/ViewStore';
import constants from '../constants';
import Actions from '../flux/Actions';
import DataStore from '../flux/DataStore';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: undefined
    };
    this.updateMenu = this.updateMenu.bind(this);
    this.addNew = this.addNew.bind(this);
    this.edit = this.edit.bind(this);
    this.remove = this.remove.bind(this);
    this.close = this.close.bind(this);
  }
  componentWillMount() {
    ViewStore.addChangeListener(this.updateMenu);
  }
  componentWillUnmount() {
    ViewStore.removeChangeListener(this.updateMenu);
  }
  updateMenu() {
    this.setState({ current: ViewStore.getCurrentView() })
  }
  addNew() {
    this.props.history.push('/' + this.state.current.view + '/' + constants.NEW);
  }
  edit() {
    this.props.history.push('/' + this.state.current.view + '/' + constants.EDIT + '/' + this.state.current.itemId);
  }
  remove() {
    const current = this.state.current;
    Actions.removeItem(current.itemId, current.view);
    this.close();
  }
  close() {
    this.props.history.push('/' + this.state.current.view);
  }
  render() {
    const current = this.state.current;
    return (
      <div>
        <div id="name">myLocations</div>
        <div id="actions">
          {(current ? !current.item && !current.edit && !current.newItem : undefined) && <button onClick={this.addNew}>New</button>}
          {(current ? current.item : undefined) && <button onClick={this.edit}>Edit</button>}
          {(current ? current.item : undefined) && <button onClick={this.remove}>Remove</button>}
        </div>
        {(current ? current.item || current.edit || current.newItem : undefined) && <div className="close" onClick={this.close}>Close</div>}
      </div>
    );
  }
}

export default Menu;