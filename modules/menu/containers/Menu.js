import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import authCheckRedirect from '../../common/authCheckRedirect'
import Loading from '../../base/components/Loading'
import Basic from '../components/Basic'
// import * as MenuActions from '../actions/MenuActions'
// import * as MenuItemActions from '../actions/MenuItemActions'
// import bindIndexToActionCreators from '../../common/bindIndexToActionCreators'
import documentTitle from '../../common/documentTitle'

class Menu extends React.Component {
  componentDidMount() {
    authCheckRedirect();
    // this.props.recipeActions.load(this.props.match.params.recipe);
  }

  componentWillUnmount() {
    documentTitle();
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.match.params.recipe !== this.props.match.params.recipe) {
    //   nextProps.recipeItemActions.reset();
    //   nextProps.recipeActions.load(nextProps.match.params.recipe);
    //   window.scrollTo(0, 0);
    // }
  }

  render() {
    // let { lists, recipes, match, status, user } = this.props;
    // let { recipeActions, recipeItemActions } = this.props;
    // let data = recipes.find(t => t.id == match.params.recipe);
    if (true) {
      // let showEditLink = (user !== null && user.id === data.author);
      // documentTitle(data.title);
      return (
          <Basic/>
      );
    } else {
      return ( <Loading message="Loading"/> )
    }
  }
}

// Menu.propTypes = {
//   recipes: PropTypes.array.isRequired,
//   lists: PropTypes.array.isRequired,
//   status: PropTypes.string.isRequired,
//   user: PropTypes.object.isRequired,
//   match: PropTypes.object.isRequired,
//   recipeActions: PropTypes.object.isRequired,
//   recipeItemActions: PropTypes.object.isRequired,
// };

const mapStateToProps = state => ({
  // user: state.user,
  // recipes: state.recipe.recipes,
  // status: state.recipe.status,
  // lists: state.list.lists,
});

const mapDispatchToProps = (dispatch, props) => ({
  // recipeItemActions: bindActionCreators(MenuItemActions, dispatch),
  // recipeActions: bindActionCreators(
  //   bindIndexToActionCreators(MenuActions, props.match.params.recipe),
  //   dispatch
  // ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
