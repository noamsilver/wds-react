import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import LocationView from './LocationView';
import DataStore from '../flux/DataStore';
import Actions from '../flux/Actions';
import '../../styles/list.css';

class LocationsList extends Component {
  constructor(props) {
    super();
    this.state = {
      sortAsc: true,
      groupCategories: false,
      list: DataStore.getAllLocations()
    }
    this.createList = this.createList.bind(this);
    this.updateList = this.updateList.bind(this);
  }
  componentWillMount() {
    DataStore.addChangeListener(this.updateList);
    Actions.locationsView();
  }
  componentWillUnmount() {
    DataStore.removeChangeListener(this.updateList);
  }
  updateList() {
    return this.setState({ list: DataStore.getAllLocations()});
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
    return list.map(value =>
      <Link to={'/locations/' + value.name.toLowerCase()}><div className="row">{value.name}<span className="cat_name">{value.category}</span></div></Link>
    );
  }

  render() {
    let list = this.createList();
    return (
      <div id="locations" className="list">
        <h2>Locations</h2>{/*remove*/}
        { list.length === 0 ? <div>Click New to add a new location</div> : list }
        <Route path="/locations/:name" component={LocationView}/>
      </div>
    );
  }
}

export default LocationsList;