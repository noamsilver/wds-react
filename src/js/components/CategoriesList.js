import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import CategoryView from './CategoryView';
import DataStore from '../flux/DataStore';
import Actions from '../flux/Actions';
import '../../styles/list.css';

class CategoriesList extends Component {
  constructor(props) {
    super();
    this.state = {
      sortAsc: true,
      list: DataStore.getAllCategories()
    }
    this.createList = this.createList.bind(this);
    this.updateList = this.updateList.bind(this);
  }
  componentWillMount() {
    DataStore.addChangeListener(this.updateList);
    Actions.categoriesView();
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
      <Link to={'/categories/' + value.name.toLowerCase()}><div className="row">{value.name}</div></Link>
    );
  }

  render() {
    let list = this.createList();
    return (
      <div id="categories" className="list">
        <h2>Categories</h2>{/*remove*/}
        { list.length === 0 ? <div>Click New to add a new category</div> : list }
        <Route path="/categories/:name" component={CategoryView}/>
      </div>
    );
  }
}

export default CategoriesList;