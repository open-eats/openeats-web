import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import authCheckRedirect from '../../common/authCheckRedirect'
import documentTitle from '../../common/documentTitle'

import TC from '../constants/TabConstants.js'

import Loading from '../../base/components/Loading'
import MenuItemModal from '../components/modals/MenuItemModal'
import Stats from '../components/Stats'
import MenuLayout from '../components/MenuLayout'
import FullMenu from '../components/FullMenu'

import * as MenuItemActions from '../actions/MenuItemActions'
import { fetchRecipeList } from '../actions/RecipeListActions'
import { menuItemValidation } from '../actions/validation'
import OnTheMenu from "../../news/components/News";

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: TC.OnTheMenu,
      showMenuModal: false,
      editMenuEventId: 0,
      startDate: null,
      endDate: null,
    };
  }

  componentDidMount() {
    authCheckRedirect();
    documentTitle('Menu');
    this.props.menuItemActions.loadItems();
    this.props.menuItemActions.loadStats();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.tab !== prevState.tab && this.state.tab === TC.Stats) {
      this.props.menuItemActions.loadStats();
    }
  }

  componentWillUnmount() {
    documentTitle();
  }

  changeTab = (tab) => {
    this.setState({tab});
  };

  onMenuItemShow = (id, startDate=null, endDate=null) => {
    this.setState({
      showItemModal: true,
      editMenuItemEventId: parseInt(id, 10),
      startDate: startDate,
      endDate: endDate,
    })
  };

  render() {
    const { menuItems, stats, SimpleLayout } = this.props;
    const { menuItemActions } = this.props;
    const { showItemModal, editMenuItemEventId, startDate, tab } = this.state;

    if (menuItems !== null) {
      if (SimpleLayout) {
        return (
          <div>
            <MenuItemModal
              id={ editMenuItemEventId }
              show={ showItemModal }
              onHide={ () => { this.setState({showItemModal: false}) } }
              event={ menuItems.find(t => t.id === editMenuItemEventId) }
              startDate={ startDate }
              onSave={ menuItemActions.save }
              onRemove={ menuItemActions.remove }
              fetchRecipeList={ fetchRecipeList }
              validation={ menuItemValidation }
            />
            <SimpleLayout
              menuItems={menuItems}
              editMenuItem={this.onMenuItemShow}
              completeMenuItem={menuItemActions.completeMenuItem}
            />
          </div>
        );
      }
      return (
        <MenuLayout tab={tab} changeTab={this.changeTab} onMenuItemShow={this.onMenuItemShow}>
          <MenuItemModal
            id={ editMenuItemEventId }
            show={ showItemModal }
            onHide={ () => { this.setState({showItemModal: false}) } }
            event={ menuItems.find(t => t.id === editMenuItemEventId) }
            startDate={ startDate }
            onSave={ menuItemActions.save }
            onRemove={ menuItemActions.remove }
            fetchRecipeList={ fetchRecipeList }
            validation={ menuItemValidation }
          />
          {tab === TC.Stats ? <Stats stats={stats}/> : ''}
          {tab === TC.OnTheMenu
            ? <FullMenu
              menuItems={menuItems}
              editMenuItem={this.onMenuItemShow}
              completeMenuItem={menuItemActions.completeMenuItem}
            />
            : ''
          }
        </MenuLayout>
      );
    } else {
      return ( <Loading message="Loading"/> )
    }
  }
}

Menu.propTypes = {
  menuItems: PropTypes.array,
  stats: PropTypes.array,
  menuItemActions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  menuItems: state.menu.items,
  stats: state.menu.stats,
});

const mapDispatchToProps = dispatch => ({
  menuItemActions: bindActionCreators(MenuItemActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
