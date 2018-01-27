"use strict";

import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, defineMessages } from 'react-intl'

import { Checkbox } from '../../common/components/FormComponents'
import ListFooter from './ListFooter'
import ListItem from './ListItem'
import AddItem from './AddItem'

import {
  ALL_ITEMS,
  ACTIVE_ITEMS,
  COMPLETED_ITEMS
} from '../constants/ListStatus'

class ListItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nowShowing: ALL_ITEMS,
      editing: null,
    };
  }

  toggleEdit = (id) =>  {
    this.setState({editing: id});
  };

  toggleAll = (name, checked) =>  {
    this.props.itemActions.toggleAll(
        this.props.items,
        checked,
        this.props.activeListID
    )
  };

  filterStatus = (status) =>  {
    this.setState({nowShowing: status});
  };

  render() {
    let footer;
    let main;
    let items = this.props.items;

    let shownItems = items.filter(function (item) {
      switch (this.state.nowShowing) {
      case ACTIVE_ITEMS:
        return !item.completed;
      case COMPLETED_ITEMS:
        return item.completed;
      default:
        return true;
      }
    }, this);

    let listItems = shownItems.map(function (item) {
      return (
        <ListItem
          key={ item.id }
          item={ item }
          editing={ this.state.editing === item.id }
          onToggleEdit={ this.toggleEdit }
          onToggle={ this.props.itemActions.toggle }
          onDestroy={ this.props.itemActions.destroy }
          onSave={ this.props.itemActions.save }
        />
      );
    }, this);

    let activeListCount = items.reduce(function (accum, item) {
      return item.completed ? accum : accum + 1;
    }, 0);

    let completedCount = items.length - activeListCount;

    if (activeListCount || completedCount) {
      footer =
        <ListFooter
          itemCount={ activeListCount }
          completedCount={ completedCount }
          activeFilter={ this.state.nowShowing }
          onClearCompleted={ this.props.itemActions.clearCompleted.bind(this, items) }
          onFilterStatus={ this.filterStatus }
        />;
    }

    if (items.length) {
      main = (
        <section className="main">
          <Checkbox
            size="toggle-all"
            checked={ activeListCount === 0 }
            change={ this.toggleAll }
          />
          <ul className="item-list">
            { listItems }
          </ul>
        </section>
      );
    }

    return (
      <div>
        <header className="header">
          <AddItem addItem={ this.props.itemActions.add }/>
        </header>
        { main }
        { footer }
      </div>
    );
  }
}

ListItems.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  activeListID: PropTypes.string,
  itemActions: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ListItems)
