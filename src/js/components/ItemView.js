import React, { Component } from 'react';
import DataStore from '../flux/DataStore';
import constants from '../constants';
import Actions from '../flux/Actions';
import { withRouter } from 'react-router-dom';

class ItemView extends Component {
  constructor(props) {
    super();
    const params = this.props.match.params;
    this.state = {
      item: params.view === constants.LOCATIONS ? DataStore.getLocation(params.item) : DataStore.getCategory(params.item)
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
  udateView(params) {
    if (params.action === 'new') {
      Actions.newItemView();
    } else if (params.item) {
      if (params.action === 'view') {
        Actions.itemView(params.item);
      } else if (params.action === 'edit') {
        Actions.editItemView(params.item);
      }
    }
  }
  render() {
    const params = this.props.match.params;
    const newItem = params.action === 'new';
    return (
      <h3>A {params.view === constants.LOCATIONS ? 'location' : 'category'} - {newItem ? 'New' : (params.view === constants.LOCATIONS ? DataStore.getLocation(params.item) : DataStore.getCategory(params.item)).name}</h3>
    );
  }
}

export default withRouter(ItemView);