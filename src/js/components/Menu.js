import React, { Component } from 'react';
import ViewStore from '../flux/ViewStore';
import constants from '../constants';
import Actions from '../flux/Actions';
import DataStore from '../flux/DataStore';
import '../../styles/menu.css';

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
  componentDidMount() {
    this.calcWidth();
    window.addEventListener('resize', this.calcWidth);
  }
  componentDidUpdate() {
    this.calcWidth();
  }
  componentWillUnmount() {
    ViewStore.removeChangeListener(this.updateMenu);
    window.removeEventListener('resize', this.calcWidth);
  }
  updateMenu() {
    this.setState({ current: ViewStore.getCurrentView() })
  }
  calcWidth() {
    let menuEl = document.getElementById('menu');
    let nameEl = document.getElementById('name');
    let actionsEl = document.getElementById('actions');
    let closeEl = document.querySelector('#menu .close');
    let menuCoStyle = window.getComputedStyle ? window.getComputedStyle(menuEl, null) : menuEl.currentStyle;
    let menuPadding = (parseInt(menuCoStyle.paddingRight) || 0) + (parseInt(menuCoStyle.paddingLeft) || 0);
    let actionsMarginRight = nameEl.offsetWidth;
    let newWidth = menuEl.clientWidth - menuPadding - nameEl.offsetWidth - actionsMarginRight - 1;
    if (!closeEl) {
      actionsEl.style.width = newWidth + 'px';
      actionsEl.style.marginRight = actionsMarginRight + 'px';
    } else {
      newWidth -= closeEl.offsetWidth;
      actionsEl.style.width = newWidth + 'px';
    }
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
      <div id="menu">
        <div id="name">myLocations</div>
        <div id="actions">
          {(current ? !current.item && !current.edit && !current.newItem : undefined) && <div className="button" onClick={this.addNew}>New</div>}
          {(current ? current.item : undefined) && <div className="button" onClick={this.edit}>Edit</div>}
          {(current ? current.item : undefined) && <div className="button" onClick={this.remove}>Remove</div>}
        </div>
        {(current ? current.item || current.edit || current.newItem : undefined) && <div className="close button" onClick={this.close}>Close</div>}
      </div>
    );
  }
}

export default Menu;