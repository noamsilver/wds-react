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
    this.state = {
      view: params.view,
      sortAsc: true,
      groupCategories: false,
      list: params.view === constants.LOCATIONS ? DataStore.getAllLocations() : DataStore.getAllCategories()
    };
    this.createList = this.createList.bind(this);
    this.updateData = this.updateData.bind(this);
    this.updateView = this.updateView.bind(this);
    this.sortByName = this.sortByName.bind(this);
    this.changeSortDirection = this.changeSortDirection.bind(this);
    this.changeGrouping = this.changeGrouping.bind(this);
  }
  componentWillMount() {
    DataStore.addChangeListener(this.updateData);
    this.updateView(this.props.match.params.view);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      view: nextProps.match.params.view,
      list: nextProps.match.params.view === constants.LOCATIONS ? DataStore.getAllLocations() : DataStore.getAllCategories()
    });
  }
  componentWillUpdate(nextProps, nextState) {
    this.updateView(nextProps.match.params.view);
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
  createList() {
    let newList = this.state.list;
    if (this.props.match.params.view === constants.LOCATIONS && this.state.groupCategories) {
      let categoriesList = [];
      let categoriesSet = new Set(newList.map(item => item.category));
      let categoriesNames = [];
      categoriesSet.forEach(item => categoriesNames.push({ name: item }));
      categoriesNames.sort(this.sortByName);
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
        to={'/' + this.props.match.params.view + '/view/' + item.id}
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
  render() {
    const nextList = this.createList();
    const params = this.props.match.params;
    return (
      <div id={params.view} className="list content">
        <div className="sort-categories">
          <div onClick={this.changeSortDirection}><span>Sort</span> {this.state.sortAsc ? 'Asc' : 'Dec'}</div>
          {params.view === constants.LOCATIONS && <div onClick={this.changeGrouping}><span>Display</span> {this.state.groupCategories ? 'Grouped' : 'Ungrouped'}</div>}
        </div>
        <h2>{params.view === constants.LOCATIONS ? 'Locations' : 'Categories'}</h2>
        { nextList.length === 0 ? <div>Click New to add {params.view}</div> : nextList }
      </div>
    );
  }
}

export default ListView;