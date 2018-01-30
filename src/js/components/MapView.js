import React, { Component } from 'react';
import GoogleMapView from './GoogleMapView';
import DataStore from '../flux/DataStore';

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = { item: DataStore.getLocation(this.props.match.params.item) }

    this.updateView = this.updateView.bind(this);
  }
  componentWillMount() {
    DataStore.addChangeListener(this.updateData);
    this.updateView(this.props.match.params);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ item: DataStore.getLocation(neztProps.match.params.item) })
    this.updateView(nextProps.match.params);
  }
  updateView(params) {
    Actions.itemView(params.item);
  }
  render() {
    return (
      <GoogleMapView
        googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCDTftK5de8YY-KCgdZ2tB2NfTgBWsziTI'}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div id="map" className="content" />}
        mapElement={<div style={{ height: `100%` }} />}
        item={this.state.item}
      />
    );
  }
}