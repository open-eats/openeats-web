"use strict";

import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { injectIntl, defineMessages } from 'react-intl'

import { 
  ALL_ITEMS, 
  ACTIVE_ITEMS, 
  COMPLETED_ITEMS 
} from '../constants/ListStatus'

const ListFooter = ({activeFilter, completedCount, itemCount, onClearCompleted, onFilterStatus, intl }) => {
  const { formatMessage } = intl;
  const messages = defineMessages({
    itemsLeft: {
      id: 'list.footer.items_left',
      description: 'Number of items left',
      defaultMessage: '{itemCount, plural, =0 {No items} one {1 item left} other {{itemCount} items left}}',
    },
    all: {
      id: 'list.footer.all',
      description: 'Show all items',
      defaultMessage: 'All',
    },
    completed: {
      id: 'list.footer.completed',
      description: 'Show only completed items',
      defaultMessage: 'Completed',
    },
    active: {
      id: 'list.footer.active',
      description: 'Show active items',
      defaultMessage: 'Active',
    },
    clearCompleted: {
      id: 'list.footer.clear_completed',
      description: 'Clear all completed list items',
      defaultMessage: 'Clear completed',
    }
  });

  let clearButton = null;

  if (completedCount > 0) {
    clearButton = (
      <button
        className="clear-completed clear-button"
        onClick={ onClearCompleted }>
        { formatMessage(messages.clearCompleted) }
      </button>
    );
  }

  return (
    <div className="list-footer">
      <span className="list-count">
        { formatMessage(messages.itemsLeft, {itemCount: itemCount}) }
      </span>
      <ul className="filters">
        <li>
          <a
            href="#"
            className={ classNames({ selected: activeFilter === ALL_ITEMS })}
            onClick={ () => { onFilterStatus(ALL_ITEMS) }}>
              { formatMessage(messages.all) }
          </a>
        </li>
        { ' ' }
        <li>
          <a
            href="#"
            className={ classNames({ selected: activeFilter === ACTIVE_ITEMS })}
            onClick={ () => { onFilterStatus(ACTIVE_ITEMS) }}>
              { formatMessage(messages.active) }
          </a>
        </li>
        { ' ' }
        <li>
          <a
            href="#"
            className={ classNames({ selected: activeFilter === COMPLETED_ITEMS })}
            onClick={ () => { onFilterStatus(COMPLETED_ITEMS) }}>
              { formatMessage(messages.completed) }
          </a>
        </li>
      </ul>
      { clearButton }
    </div>
  );
};

ListFooter.propTypes = {
  itemCount: PropTypes.number.isRequired,
  completedCount: PropTypes.number.isRequired,
  activeFilter: PropTypes.string.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  onFilterStatus: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ListFooter)
