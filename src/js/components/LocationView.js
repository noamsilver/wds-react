import React, { Component } from 'react';

class LocationView extends Component {
  constructor(props) {
    super()
  }
  render() {
    return <h3>A location - {this.props.match.params.name}</h3>;
  }
}

export default LocationView;