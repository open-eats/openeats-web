"use strict";

import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Nav from '../components/Nav'
import * as ListActions from '../../list/actions/ListActions'
import * as AuthActions from '../../account/actions/AuthActions'
import * as RandomRecipeActions from '../actions/RandomRecipeActions'

let NavBar = ({ user, lists, listActions, authActions, randomRecipeActions }) => {
  return (
    <Nav
      user={ user }
      lists={ lists }
      listActions={ listActions }
      authActions={ authActions }
      randomRecipeActions={ randomRecipeActions }
    />
)};

NavBar.propTypes = {
  lists: PropTypes.array.isRequired,
  listActions: PropTypes.object.isRequired,
  randomRecipeActions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  lists: state.list.lists,
});

const mapDispatchToProps = dispatch => ({
  listActions: bindActionCreators(ListActions, dispatch),
  authActions: bindActionCreators(AuthActions, dispatch),
  randomRecipeActions: bindActionCreators(RandomRecipeActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
