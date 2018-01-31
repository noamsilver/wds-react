import React, { Component } from 'react';
import GoogleMapView from './GoogleMapView';
import DataStore from '../flux/DataStore';
import Actions from '../flux/Actions'

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: DataStore.getLocation(this.props.match.params.item),
      mapHeight: this.calcHeight()
    }

    this.updateView = this.updateView.bind(this);
    this.updateHeight = this.updateHeight.bind(this);
  }
  componentWillMount() {
    this.updateView(this.props.match.params);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ item: DataStore.getLocation(neztProps.match.params.item) })
    this.updateView(nextProps.match.params);
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateHeight);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateHeight);
  }
  updateView(params) {
    Actions.itemView(params.item);
  }
  calcHeight() {
    return window.innerHeight - 265;
  }
  updateHeight() {
    this.setState({ mapHeight: this.calcHeight()})
  }
  render() {
    return (
      <GoogleMapView
        googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDAPL1m0qlIIwrRenSSJtvx0r3FsWlMGTg'}
        loadingElement={<div style={{ height: this.state.mapHeight, width: '100%' }} />}
        containerElement={<div id="map" className="content" />}
        mapElement={<div style={{ height: this.state.mapHeight, width: '100%'}} />}
        item={this.state.item}
      />
    );
  }
}

export default MapView;