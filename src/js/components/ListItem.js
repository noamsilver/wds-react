import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import '../../styles/list-item.css';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.vibrateDevice = this.vibrateDevice.bind(this);
  }
  initializeVibration() {
    // check vibration support
    navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
  }
  vibrateDevice() {
    if (navigator.vibrate) {
      navigator.vibrate(500);
    }
  }
  render() {
    const props = this.props;
    return (
      <div className="row">
        <Link to={props.to} onClick={this.vibrateDevice}>
          <div className="fill">
            {props.item.name}
            {props.isLocation && <span className="cat-name">{props.item.category}</span>}
          </div>
        </Link>
      </div>
    );
  }
}

export default ListItem;