"use strict";

import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { injectIntl, defineMessages } from 'react-intl'

import {
  ENTER_KEY,
  ESCAPE_KEY
} from '../constants/ListStatus'
import { Checkbox } from '../../common/components/FormComponents'

class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.item.title
    };
  }

  handleSubmit = (event) => {
    let val = this.state.title.trim();
    if (val) {
      this.props.onSave(this.props.item.id, val);
      this.props.onToggleEdit(null);
      this.setState({title: val});
    } else {
      this.handleDestroy();
    }
  };

  handleEdit = () => {
    this.props.onToggleEdit(this.props.item.id);
    this.setState({title: this.props.item.title});
  };

  handleDestroy = () => {
    this.props.onDestroy(this.props.item.id);
  };

  handleKeyDown = (event) => {
    if (event.which === ESCAPE_KEY) {
      this.setState({title: this.props.item.title});
      this.props.onToggleEdit(null);
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit(event);
    }
  };

  handleChange = (event) => {
    if (this.props.editing) {
      this.setState({title: event.target.value});
    }
  };

  handleToggle = () => {
    this.props.onToggle(
      this.props.item.id,
      !this.props.item.completed
    );
  };

  render() {
    return (
      <li className={classNames({
        completed: this.props.item.completed,
        editing: this.props.editing
      })}>
        <div className="view">
          <Checkbox
            size="toggle"
            ref="editField"
            checked={ this.props.item.completed }
            change={ this.handleToggle }
          />
          <label className="item" onDoubleClick={ this.handleEdit }>
            { this.props.item.title }
          </label>
          <button className="destroy" onClick={ this.handleDestroy } />
        </div>
        <input
          ref="editField"
          className="edit"
          value={ this.state.title }
          onBlur={ this.handleSubmit }
          onChange={ this.handleChange }
          onKeyDown={ this.handleKeyDown }
        />
      </li>
    );
  }
}

ListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ListItem)
