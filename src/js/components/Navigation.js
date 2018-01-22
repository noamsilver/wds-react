import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';
import constants from '../constants';
import '../../styles/navigation.css';

class Navigation extends Component {
  constructor(props) {
    super();
    this.viewLocationsList = this.viewLocationsList.bind(this);
    this.viewCategoriesList = this.viewCategoriesList.bind(this);
  }
  viewLocationsList(event) {
    this.props.history.push('/' + constants.LOCATIONS)
  }
  viewCategoriesList(event) {
    this.props.history.push('/' + constants.CATEGORIES)
  }
  render() {
    return (
      <div id="nav">
        <NavLink to="/locations" className="nav-button" activeClassName="active" onClick={this.viewLocationsList}>Locations</NavLink>
        <NavLink to="/categories" className="nav-button" activeClassName="active" onClick={this.viewCategoriesList}>Categories</NavLink>
      </div>
    );
  }
}

export default Navigation;