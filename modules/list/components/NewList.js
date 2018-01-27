"use strict";

import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, defineMessages } from 'react-intl'

import { ENTER_KEY } from '../constants/ListStatus'

class NewList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.title || '',
    };
  }

  handleChange = (event) => {
    this.setState({title: event.target.value});
  };

  handleKeyDown = (event) => {
    if (event.which === ENTER_KEY) {
      this.handleSubmit(event);
    }
  };

  handleSubmit = () => {
    let val = this.state.title.trim();
    if (val) {
      this.props.addList(val);
    }
  };

  render() {
    const { formatMessage } = this.props.intl;
    const messages = defineMessages({
      header: {
        id: 'new_list.header',
        description: 'Create a New List',
        defaultMessage: 'Create a New List',
      },
      placeholder: {
        id: 'new_list.placeholder',
        description: 'Enter your list name.',
        defaultMessage: 'Enter your list name.',
      },
      button: {
        id: 'new_list.button',
        description: 'Create my List!',
        defaultMessage: 'Create my List!',
      },
    });

    return (
      <div className="new-list">
        <h2 className="new-list-heading">
          { formatMessage(messages.header) }
        </h2>
        <input
          type="text"
          autoFocus="true"
          className="form-control"
          placeholder={ formatMessage(messages.placeholder) }
          value={ this.state.title }
          onChange={ this.handleChange }
          onKeyDown={ this.handleKeyDown }
        />
        <button
          type="button"
          className="btn btn-lg btn-primary btn-block"
          onClick={ this.handleSubmit }
        >{ formatMessage(messages.button) }</button>
      </div>
    )
  };
}

NewList.propTypes = {
  title: PropTypes.string,
  intl: PropTypes.object.isRequired,
  addList: PropTypes.func.isRequired,
};

export default injectIntl(NewList)
