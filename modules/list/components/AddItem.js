"use strict";

import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, defineMessages } from 'react-intl'

import {
  ENTER_KEY
} from '../constants/ListStatus'

class AddItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
    };
  }

  handleChange = (event) => {
    this.setState({title: event.target.value});
  };

  handleKeyDown = (event) => {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();
    let val = this.state.title.trim();
    if (val) {
      this.props.addItem(val);
      this.setState({title: ''});
    }
  };

  render() {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      item: {
        id: 'list.new-input-placeholder',
        description: 'Placeholder for inputting new items',
        defaultMessage: 'What do you need to buy?',
      },
    });

    return (
      <input
        className="new-item"
        placeholder={formatMessage(messages.item)}
        value={this.state.title}
        onKeyDown={this.handleKeyDown}
        onChange={this.handleChange}
        autoFocus={true}
      />
    )
  }
}

AddItem.propTypes = {
  addItem: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired
};

export default injectIntl(AddItem)
