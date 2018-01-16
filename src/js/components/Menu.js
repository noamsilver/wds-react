import React, { Component } from 'react';
import ViewStore from '../flux/ViewStore';
import Actions from '../flux/Actions';
import constants from '../constants';

class Menu extends Component {
  constructor(props) {
    super();
    this.state = {
      current: ViewStore.getCurrentView()
    }
    this.updateMenu = this.updateMenu.bind(this);
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
  render() {
    const current = this.state.current;
    return (
      <div>
        <div id="name">myLocations</div>
        <div id="actions">
          {(current.item === false && current.edit === false) && <span>New</span>}
          {current.item === true && <span>Edit</span>}
          {current.item === true && <span>Remove</span>}
        </div>
        {(current.item === true || current.edit === true) && <div className="close">Close</div>}
      </div>
    );
  }
}

export default Menu;