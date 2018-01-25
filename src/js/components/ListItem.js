import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import '../../styles/list-item.css';

class ListItem extends Component {
  render() {
    const props = this.props;
    return (
      <div className="row">
        <Link to={props.to}>
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