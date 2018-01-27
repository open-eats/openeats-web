"use strict";

import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, defineMessages } from 'react-intl'

import Items from '../containers/Items'
import MyLists from './MyLists'
import ListHeader from './ListHeader'
import NewList from './NewList'
import Error from './Error'

require("./../css/grocery_list.scss");

class GroceryList extends React.Component {
  render() {
    const { formatMessage } = this.props.intl;
    const messages = defineMessages({
      my_lists: {
        id: 'grocery_list.my_lists',
        description: 'My Lists',
        defaultMessage: 'My Lists',
      },
      footer: {
        id: 'grocery_list.footer',
        description: 'Double Click to edit an item.',
        defaultMessage: 'Double Click to edit an item.',
      },
    });

    let { activeListID, lists, listActions, error } = this.props;

    let renderList = '';
    let list = lists.find(t => t.id == activeListID);
    if (activeListID && list) {
      renderList = (
        <div>
          <div className="grocery-list">
            <ListHeader
              list={ list }
              updateList = { listActions.save }
              removeList = { listActions.destroy }
            />
            <Items activeListID={ activeListID } />
          </div>
          <div className="list-info-footer">{ formatMessage(messages.footer) }</div>
        </div>
      );
    } else {
      renderList = (
        <NewList addList={ listActions.add }/>
      );
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            { error ? <Error message={ error }/> : '' }
            { renderList }
          </div>
          <div className="col-md-3 hidden-xs">
            <MyLists title={ formatMessage(messages.my_lists) } lists={ lists }/>
          </div>
        </div>
      </div>
    );
  }
}

GroceryList.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    item_count: PropTypes.number.isRequired
  }).isRequired).isRequired,
  error: PropTypes.string,
  activeListID: PropTypes.string,
  listActions: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(GroceryList)
