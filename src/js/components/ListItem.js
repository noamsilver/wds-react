import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import constants from '../constants';
import '../../styles/list-item.css';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.vibrateDevice = this.vibrateDevice.bind(this);
  }
  vibrateDevice() {
    if (navigator.vibrate) {
      navigator.vibrate(500);
    }
  }
  viewOnMapClick(event) {
    event.stopPropagation();
  }
  render() {
    const props = this.props;
    return (
      <div className="row">
        <Link to={'/' + (props.isLocation ? constants.LOCATIONS : constants.CATEGORIES) + '/view/' + props.item.id} onClick={this.vibrateDevice}>
          <div className="fill">
            {props.item.name}
            {props.isLocation && <Link to={'/' + (props.isLocation ? constants.LOCATIONS : constants.CATEGORIES) + '/map/' + props.item.id} className="view-on-map" onClick={this.viewOnMapClick}> View on map</Link>}
            {props.isLocation && <span className="cat-name">{props.item.category}</span>}
          </div>
        </Link>
      </div>
    );
  }
}

export default ListItem;