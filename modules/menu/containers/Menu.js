import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import qs from 'query-string'

import authCheckRedirect from '../../common/authCheckRedirect'
import Loading from '../../base/components/Loading'
import Calender from '../components/Calendar'
import MenuModal from '../components/MenuModal'
import MenuItemModal from '../components/MenuItemModal'
import * as MenuActions from '../actions/MenuActions'
import * as MenuItemActions from '../actions/MenuItemActions'
// import bindIndexToActionCreators from '../../common/bindIndexToActionCreators'
import documentTitle from '../../common/documentTitle'

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenuModal: false,
      editMenuEventId: 0,
      showItemModal: false,
      editMenuItemEventId: 0,
      startDate: null,
      endDate: null,
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
    let { menus, menuItems, location } = this.props;
    let { menuActions, menuItemActions } = this.props;
    let { showMenuModal, editMenuEventId, showItemModal, editMenuItemEventId, startDate, endDate } = this.state;
    const query = qs.parse(location.search);
    console.log(menus)
    //TODO adding a loading status here so that if there are no menu items the code still works!
    if (menuItems.length > 0) {
      return (
        <div>
          <MenuModal
            id={ editMenuEventId }
            show={ showMenuModal }
            onHide={ () => { this.setState({showMenuModal: false}) } }
            event={ menus.find(t => t.id == editMenuEventId) }
            menuActions={ menuActions }
          />
          <MenuItemModal
            id={ editMenuItemEventId }
            menus={ menus }
            show={ showItemModal }
            onHide={ () => { this.setState({showItemModal: false}) } }
            event={ menuItems.find(t => t.id == editMenuItemEventId) }
            menuItemActions={ menuItemActions }
            startDate={ startDate }
            endDate={ endDate }
          />
          <Calender
            items={ query.menu ? menuItems.filter(t => t.menu == query.menu ) : menuItems }
            qs={ query }
            onMenuItemShow={ (id, startDate=null, endDate=null) => {
              console.log(id)
              this.setState({
                showItemModal: true,
                editMenuItemEventId: id,
                startDate: startDate,
                endDate: endDate,
              })
            }}
            onMenuShow={ id => {
              console.log(id)
              this.setState({
                showMenuModal: true,
                editMenuEventId: id,
                startDate: startDate,
                endDate: endDate,
              })
            }}
          />
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
