import React, { Component } from 'react';
import CategoryView from './CategoryView';

class CategoriesList extends Component {
  constructor(props) {
    super()
  }
  render() {
    return <h2>Categories</h2>;

    <Route path="/categories/:name" component={CategoryView}/>
  }
}

export default CategoriesList;