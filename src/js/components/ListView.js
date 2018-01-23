import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import ListItem from './ListItem';
import ItemView from './ItemView';
import DataStore from '../flux/DataStore';
import Actions from '../flux/Actions';
import constants from '../constants';
import '../../styles/list.css';

class ListView extends Component {
  constructor(props) {
    super(props);
    const params = this.props.match.params;
    this.state = {
      view: params.view,
      sortAsc: true,
      groupCategories: false,
      list: params.view === constants.LOCATIONS ? DataStore.getAllLocations() : DataStore.getAllCategories()
    };
    this.createList = this.createList.bind(this);
    this.updateData = this.updateData.bind(this);
    this.updateView = this.updateView.bind(this);
  }
  componentWillMount() {
    DataStore.addChangeListener(this.updateData);
    this.updateView(this.props.match.params.view);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      view: nextProps.match.params.view
    });
  }
  componentWillUpdate(nextProps, nextState) {
    this.updateView(nextProps.match.params.view);
  }
  componentWillUnmount() {
    DataStore.removeChangeListener(this.updateData);
  }
  updateData() {
    this.setState({ list: this.params.view === constants.LOCATIONS ? DataStore.getAllLocations() : DataStore.getAllCategories() });
  }
  updateView(view) {
    Actions.changeView(view)
  }
  createList() {
    let list = this.state.list;
    list.sort((a, b) => {
      if (a.name && b.name && a.name < b.name) {
        return this.state.sortAsc ? -1: 1;
      }
      if (a.name && b.name && a.name > b.name) {
        return this.state.sortAsc ? 1: -1;
      }
      return 0;
    });
    return list.map(item =>
      <ListItem to={'/' + this.params.view + '/view/' + item.id.toLowerCase()} item={item} isLocation={this.params.view === constants.LOCATIONS ? true : false}/>
    );
  }
  render() {
    const list = this.createList();
    const params = this.props.match.params;
    return (
      <div id={params.view} className="list">
        <h2>{params.view === constants.LOCATIONS ? 'Locations' : 'Categories'}</h2>
        { list.length === 0 ? <div>Click New to add {params.view}</div> : list }
        <Route path="/:view/:action/:item?" component={ItemView}/>
      </div>
    );
  }
}

export default ListView;