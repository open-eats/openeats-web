"use strict";

import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { injectIntl, defineMessages } from 'react-intl'

import {
  ENTER_KEY,
  ESCAPE_KEY
} from '../constants/ListStatus'

class ListHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.list.title || '',
      editing: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.list.title,
      editing: false,
    });
  }

  handleDelete = (message) => {
    if (confirm(message)) {
      this.props.removeList(this.props.list.id)
    }
  };

  handleEdit = () => {
    this.setState({editing: true});
  };

  handleChange = (event) => {
    if (this.state.editing) {
      this.setState({title: event.target.value});
    }
  };

  handleKeyDown = (event) => {
    if (event.which === ESCAPE_KEY) {
      this.setState({
        title: this.props.list.title,
        editing: false,
      });
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit(event);
    }
  };

  handleSubmit = () => {
    let val = this.state.title.trim();
    if (val) {
      this.props.updateList(this.props.list.id, val);
      this.setState({
        title: val,
        editing: false,
      });
    } else {
      this.setState({
        title: this.props.list.title,
        editing: false,
      });
    }
  };

  render() {
    const { formatMessage } = this.props.intl;
    const messages = defineMessages({
      confirmDelete: {
        id: 'list_header.confirm_delete',
        description: 'Are you sure you want to delete this list?',
        defaultMessage: 'Are you sure you want to delete this list?',
      },
    });

    return (
      <div className={classNames({
          editing: this.state.editing,
          "list-header": true
        })}>
        <div className="view">
          <label onDoubleClick={ this.handleEdit }>
            { this.state.title }
          </label>
          <button
            className="destroy"
            onClick={() => this.handleDelete(formatMessage(messages.confirmDelete)) }
          />
        </div>
        <input
          ref="editField"
          className="edit"
          value={ this.state.title  }
          onBlur={ this.handleSubmit }
          onChange={ this.handleChange }
          onKeyDown={ this.handleKeyDown }
        />
      </div>
    )
  }
}

ListHeader.propTypes = {
  list: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    item_count: PropTypes.number.isRequired
  }).isRequired,
  removeList: PropTypes.func.isRequired,
  updateList: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ListHeader)
