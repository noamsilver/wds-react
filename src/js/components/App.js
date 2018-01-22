import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Menu from './Menu';
import ListView from './ListView';
import Navigation from './Navigation';
import constants from '../constants';
import '../../styles/app.css';

class App extends Component {
  render() {
    let showList = location.pathname.startsWith('/' + constants.LOCATIONS) || location.pathname.startsWith('/' + constants.CATEGORIES);
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" render={() => <Redirect to={'/' + constants.LOCATIONS}/>}/>
          <Route path="/" component={Menu}/>
          {showList ? <Route path="/:view" component={ListView}/> : undefined}
          <Route path="/" component={Navigation}/>
        </div>
    </BrowserRouter>);
  }
}

export default App;