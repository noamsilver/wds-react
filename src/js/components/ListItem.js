import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import '../../styles/list-item.css';

class ListItem extends Component {
  render() {
    const props = this.props;
    return (
      <Link to={props.to}>
        <div className="row">
          {props.item.name}
          {props.isLocation && <span className="cat_name">{props.item.category}</span>}
        </div>
      </Link>
    );
  }
}

export default ListItem;