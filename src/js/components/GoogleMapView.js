import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';

class GoogleMapView extends Component {
  render() {
    return (
      <GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: this.props.item.coordinates.lat, lng: this.props.item.coordinates.lng }}
      >
        <MarkerWithLabel
          position={{ lat: this.props.item.coordinates.lat, lng: this.props.item.coordinates.lng }}
          labelAnchor={new google.maps.Point(0, 0)}
          labelStyle={{backgroundColor: 'rgba(255, 255, 255, 0.75)', borderRadius: '10px', fontSize: "25px", padding: "10px"}}
        >
          <div>{this.props.item.name}</div>          
        </MarkerWithLabel>
      </GoogleMap>
    )
  }
}

export default withScriptjs(withGoogleMap(GoogleMapView));