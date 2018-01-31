import React, { Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import constants from '../constants';
import '../../styles/list-item.css';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.vibrateDevice = this.vibrateDevice.bind(this);
    this.viewOnMapClick = this.viewOnMapClick.bind(this);
  }
  vibrateDevice() {
    if (navigator.vibrate) {
      navigator.vibrate(500);
    }
  }
  viewOnMapClick(event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.history.push('/' + (this.props.isLocation ? constants.LOCATIONS : constants.CATEGORIES) + '/map/' + this.props.item.id);
  }
  render() {
    const props = this.props;
    return (
      <div className="row">
        <Link to={'/' + (props.isLocation ? constants.LOCATIONS : constants.CATEGORIES) + '/view/' + props.item.id} onClick={this.vibrateDevice}>
          <div className="fill">
            {props.item.name}
            {props.isLocation && <span className="view-on-map" onClick={this.viewOnMapClick}>View on map</span>}
            {props.isLocation && <span className="cat-name">{props.item.category}</span>}
          </div>
        </Link>
      </div>
    );
  }
}

export default withRouter(ListItem);