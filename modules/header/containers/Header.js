import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import NavBar from '../components/NavBar'
import * as ListActions from '../../list/actions/ListActions'
import * as AuthActions from '../../account/actions/AuthActions'
import * as RandomRecipeActions from '../actions/RandomRecipeActions'

let Header = ({ user, lists, listActions, authActions, randomRecipeActions }) => {
  return (
    <NavBar
      user={ user }
      lists={ lists }
      listActions={ listActions }
      authActions={ authActions }
      randomRecipeActions={ randomRecipeActions }
    />
)};

Header.propTypes = {
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
)(Header);
