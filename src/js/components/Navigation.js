import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/navigation.css';

class Navigation extends Component {
  constructor(props) {
    super()
  }
  render() {
    return (
      <div id="nav">
        <NavLink to="/locations" className="nav-button" activeClassName="active">Locations</NavLink>
        <NavLink to="/categories" className="nav-button" activeClassName="active">Categories</NavLink>
      </div>
    );
  }
}

export default Navigation;