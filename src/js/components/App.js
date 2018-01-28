import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Menu from './Menu';
import ListView from './ListView';
import ItemView from './ItemView';
import Navigation from './Navigation';
import constants from '../constants';
import '../../styles/app.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" render={() => <Redirect to={'/' + constants.LOCATIONS}/>}/>
          <Route path="/" component={Menu}/>
          <Switch>
            <Route exact path="/:view" component={ListView}/>
            <Route path="/:view/:action/:item?" component={ItemView}/>
          </Switch>
          <Route path="/" component={Navigation}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;