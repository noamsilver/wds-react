import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import ListItem from './ListItem';
import DataStore from '../flux/DataStore';
import Actions from '../flux/Actions';
import constants from '../constants';
import '../../styles/list.css';

class ListView extends Component {
  constructor(props) {
    super(props);
    const params = this.props.match.params;
    const isLocation = params.view === constants.LOCATIONS;
    const list = isLocation ? DataStore.getAllLocations() : DataStore.getAllCategories();
    this.state = {
      view: params.view,
      sortAsc: true,
      groupCategories: false,
      filter: 'all',
      currentCategories: isLocation ? this.getCurrentCategories(list).sort(this.sortByNameAcs) : undefined,
      list
    };
    this.initializeVibration();
    
    this.createList = this.createList.bind(this);
    this.updateData = this.updateData.bind(this);
    this.updateView = this.updateView.bind(this);
    this.sortByName = this.sortByName.bind(this);
    this.changeSortDirection = this.changeSortDirection.bind(this);
    this.changeGrouping = this.changeGrouping.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.getCurrentCategories = this.getCurrentCategories.bind(this);
  }
  initializeVibration() {
    // check vibration support
    navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
  }
  componentWillMount() {
    DataStore.addChangeListener(this.updateData);
    this.updateView(this.props.match.params.view);
  }
  componentWillReceiveProps(nextProps) {
    const params = nextProps.match.params;
    const isLocation = params.view === constants.LOCATIONS;
    const list = isLocation ? DataStore.getAllLocations() : DataStore.getAllCategories();
    this.setState({
      view: params.view,
      filter: isLocation ? this.state.filter : 'all',
      currentCategories: isLocation ? this.getCurrentCategories(list).sort(this.sortByNameAcs) : undefined,
      list
    });
    this.updateView(params.view);
  }
  componentWillUnmount() {
    DataStore.removeChangeListener(this.updateData);
  }
  updateData() {
    this.setState({ list: this.props.match.params.view === constants.LOCATIONS ? DataStore.getAllLocations() : DataStore.getAllCategories() });
  }
  updateView(view) {
    Actions.changeView(view)
  }
  changeSortDirection() {
    this.setState({ sortAsc: !this.state.sortAsc });
  }
  changeGrouping() {
    this.setState({ groupCategories: !this.state.groupCategories });
  }
  changeFilter(event) {
    this.setState({ filter: event.target.value })
  }
  getCurrentCategories(list) {
    let categoriesSet = new Set(list.map(item => item.category));
    let categoriesNames = [];
    categoriesSet.forEach(item => categoriesNames.push({ name: item }));
    return categoriesNames;
  }
  createList() {
    let newList = this.state.list;
    const isLocation = this.props.match.params.view === constants.LOCATIONS
    if (isLocation && (this.state.groupCategories || this.state.filter !== 'all')) {
      let categoriesList = [];
      let categoriesNames = this.state.currentCategories;
      this.state.filter === 'all' ? categoriesNames.sort(this.sortByName) : categoriesNames = categoriesNames.filter(category => category.name === this.state.filter);
      categoriesNames.forEach(category => {
        let categoryList = newList.filter(item => item.category === category.name);
        categoryList.length > 1 && categoryList.sort(this.sortByName);
        categoryList.forEach(item => categoriesList.push(item));
      });
      newList = categoriesList;
    } else {
      newList.sort(this.sortByName);
    }
    return newList.map(item =>
      <ListItem
        key={item.id}
        item={item}
        isLocation={this.props.match.params.view === constants.LOCATIONS ? true : false}
      />
    );
  }
  sortByName(a, b) {
    if (a.name && b.name && a.name.toLowerCase() < b.name.toLowerCase()) {
      return this.state.sortAsc ? -1: 1;
    }
    if (a.name && b.name && a.name.toLowerCase() > b.name.toLowerCase()) {
      return this.state.sortAsc ? 1: -1;
    }
    return 0;
  }
  sortByNameAcs(a, b) {
    if (a.name && b.name && a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name && b.name && a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  }
  render() {
    const nextList = this.createList();
    const params = this.props.match.params;
    return (
      <div id={params.view} className="list content">
        <div className="sort-categories">
          <div onClick={this.changeSortDirection}><span>Sort</span> {this.state.sortAsc ? 'Asc' : 'Dec'}</div>
          {params.view === constants.LOCATIONS && <div onClick={this.changeGrouping}><span>Display</span> {this.state.groupCategories ? 'Grouped' : 'Ungrouped'}</div>}
          {params.view === constants.LOCATIONS && 
            <div><span className="filter">Filter </span> 
              <select name="filter" value={this.state.filter} onChange={this.changeFilter}>
                <option key="-1" value="all">All</option>
                {this.state.currentCategories.map((item, index) => <option key={index} value={item.name}>{item.name}</option>)}
              </select>
            </div>
          }
        </div>
        <h2 className="title">{params.view === constants.LOCATIONS ? 'Locations' : 'Categories'}</h2>
        { nextList.length === 0 ? <div>Click New to add {params.view}</div> : nextList }
      </div>
    );
  }
}

export default ListView;