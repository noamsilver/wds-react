import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class GoogleMapView extends Component {
  render() {
    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: this.props.item.coordinates.lat, lng: this.props.item.coordinates.lng }}
      >
        <Marker position={{ lat: this.props.item.coordinates.lat, lng: this.props.item.coordinates.lng }}/>
      </GoogleMap>
    )
  }
}

export default withScriptjs(withGoogleMap(GoogleMapView));