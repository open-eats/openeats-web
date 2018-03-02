"use strict";

import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import authCheckRedirect from '../../common/authCheckRedirect'
import GroceryList from '../components/GroceryList'
import * as ListActions from '../actions/ListActions'
import documentTitle from '../../common/documentTitle'
import { injectIntl } from 'react-intl'

class List extends React.Component {
  componentDidMount() {
    authCheckRedirect();
    this.props.listActions.load();
  }

  componentWillUnmount() {
    documentTitle();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lists.length > 0 && nextProps.match.params.list) {
      if (!(nextProps.lists.find(t => t.slug === nextProps.match.params.list))) {
        this.props.history.push('/list/');
      }
    }
  }

  render() {
    let { match, lists, listActions, intl } = this.props;
    let list = lists.find(t => t.slug === match.params.list);
    list ? documentTitle(list.title) : documentTitle(intl.messages['new_list.header']);
    return (
      <GroceryList
        lists={ lists }
        activeListID={ list ? list.id : 0 }
        listActions={ listActions }
      />
    )
  }
}

List.propTypes = {
  lists: PropTypes.array.isRequired,
  intl: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  listActions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  lists: state.list.lists,
  error: state.list.error,
});

const mapDispatchToProps = dispatch => ({
  listActions: bindActionCreators(ListActions, dispatch),
});

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(List));
