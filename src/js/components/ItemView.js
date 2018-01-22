import React, { Component } from 'react';
import DataStore from '../flux/DataStore';
import constants from '../constants';
import Actions from '../flux/Actions';
import { withRouter } from 'react-router-dom';

class ItemView extends Component {
  constructor(props) {
    super(props);
    const params = this.props.match.params;
    this.state = {
      item: params.action === constants.NEW ? undefined : params.view === constants.LOCATIONS ? DataStore.getLocation(params.item) : DataStore.getCategory(params.item)
    };
    this.updateData = this.updateData.bind(this);
    this.updateView = this.updateView.bind(this);
  }
  componentWillMount() {
    DataStore.addChangeListener(this.updateData);
    this.updateView(this.props.match.params);
  }
  componentWillUpdate(nextProps, nextState) {
    this.updateView(nextProps.match.params);
  }
  componentWillUnmount() {
    DataStore.removeChangeListener(this.updateData);
  }
  updateData() {
    this.setState({ item: this.params.view === constants.LOCATIONS ? DataStore.getLocation(this.params.item) : DataStore.getCategory(this.params.item) })
  }
  updateView(params) {
    if (params.action === constants.NEW) {
      Actions.newItemView();
    } else if (params.item) {
      if (params.action === constants.view) {
        Actions.itemView(params.item);
      } else if (params.action === constants.EDIT) {
        Actions.editItemView(params.item);
      }
    }
  }
  render() {
    const params = this.props.match.params;
    const newItem = params.action === constants.NEW;
    return (
      <h3>A {newItem && 'new'} {params.view === constants.LOCATIONS ? 'location' : 'category'}{!newItem && ' - ' + this.state.item.name}</h3>
    );
  }
}

export default withRouter(ItemView);