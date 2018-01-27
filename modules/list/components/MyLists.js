"use strict";

import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { injectIntl, defineMessages } from 'react-intl'

const MyLists = ({title, lists, intl}) => {
  const messages = defineMessages({
    no_lists: {
      id: 'my_lists.no_lists',
      description: 'No Lists to display',
      defaultMessage: 'No Lists to display',
    },
    new_list: {
      id: 'my_lists.new_list',
      description: 'Create a New List!',
      defaultMessage: 'Create a New List!',
    },
  });

  if (lists === null || lists.length === 0) {
    return (
      <div className="grocery-lists">
      <ul className="list-group">
        <a href="#" className="list-group-item disabled">
          { title }
        </a>
        <a href="#" className="list-group-item disabled">
          { intl.formatMessage(messages.no_lists) }
        </a>
      </ul>
    </div>
    );
  }

  let items = lists.map(function(item) {
    let link = '/list/' + item.id;
    return (
      <NavLink
        to={ link }
        className="list-group-item"
        activeClassName="active"
        key={ item.id }
      >
        <span className="badge">{ item.item_count }</span>
        { item.title }
      </NavLink>
    );
  });

  return (
    <div className="grocery-lists">
      <ul className="list-group">
        <a href="#" className="list-group-item disabled">
          { title }
        </a>
        { items }
        <NavLink exact={ true } to={ '/list/' } className="list-group-item">
          { intl.formatMessage(messages.new_list) }
        </NavLink>
      </ul>
    </div>
  );
};

MyLists.propTypes = {
  title: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired,
  lists: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    item_count: PropTypes.number.isRequired
  }).isRequired).isRequired,
};

export default injectIntl(MyLists)
