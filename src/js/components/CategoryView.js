import React, { Component } from 'react';

class CategoryView extends Component {
  constructor(props) {
    super()
  }
  render() {
    return <h3>A category - {this.props.match.params.name}</h3>;
  }
}

export default CategoryView;