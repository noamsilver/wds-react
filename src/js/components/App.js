import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Menu from './Menu';
import LocationsList from './LocationsList';
import CategoriesList from './CategoriesList';
import Navigation from './Navigation';
import constants from '../constants';
import '../../styles/app.css';

class App extends Component {
  constructor(props) {
    super()
    // this.state = {
    //   currentList: constants.LOCATIONS
    // }
  }
  // setCurrentList(type) {
  //   if (type === constants.LOCATIONS || type === constants.CATEGORIES) {
  //     this.setState({ currentList: type })
  //   }
  // }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" render={() => <Redirect to="/locations"/>}/>
          <Route path="/" component={Menu}/>
          <Switch>
            <Route path="/locations" component={LocationsList}/>
            <Route path="/categories" component={CategoriesList}/>
          </Switch>
          <Route path="/" component={Navigation}/>
        </div>
    </BrowserRouter>);
  }
}

export default App;