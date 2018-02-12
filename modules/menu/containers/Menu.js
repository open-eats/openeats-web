import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import authCheckRedirect from '../../common/authCheckRedirect'
import Loading from '../../base/components/Loading'
import Calender from '../components/Calender'
import EventModal from '../components/EventModal'
import * as MenuActions from '../actions/MenuActions'
import * as MenuItemActions from '../actions/MenuItemActions'
// import bindIndexToActionCreators from '../../common/bindIndexToActionCreators'
import documentTitle from '../../common/documentTitle'

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: true,
      editEventId: 1
    };
  }

  componentDidMount() {
    authCheckRedirect();
    documentTitle('Menu');
    this.props.menuActions.load();
    this.props.menuItemActions.load();
  }

  componentWillUnmount() {
    documentTitle();
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.match.params.recipe !== this.props.match.params.recipe) {
  //     nextProps.recipeItemActions.reset();
  //     nextProps.recipeActions.load(nextProps.match.params.recipe);
  //     window.scrollTo(0, 0);
  //   }
  // }

  render() {
    let { menus, menuItems } = this.props;
    let { menuActions, menuItemActions } = this.props;
    let { showModal, editEventId } = this.state;
    if (menuItems.length > 0) {
      return (
        <div>
          <EventModal
            show={ showModal }
            onHide={ () => { this.setState({showModal: false}) } }
            event={ menuItems.find(t => t.id == editEventId) }
          />
          <Calender items={ menuItems }/>
        </div>
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
  menus: state.menu.menus,
  menuItems: state.menu.items,
});

const mapDispatchToProps = (dispatch, props) => ({
  menuActions: bindActionCreators(MenuActions, dispatch),
  menuItemActions: bindActionCreators(MenuItemActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
