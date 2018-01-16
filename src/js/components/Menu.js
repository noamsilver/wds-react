import React, { Component } from 'react';

class Menu extends Component {
  constructor(props) {
    super()
  }
  render() {
    return (
      <div>
        <h1>myLocations</h1>
        <div id="actions">
          <span>View</span>
          <span>Edit</span>
          <span>Add</span>
          <span>Remove</span>
        </div>
      </div>
    );
  }
}

export default Menu;