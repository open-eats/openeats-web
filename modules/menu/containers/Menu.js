import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import qs from 'query-string'
import moment from 'moment'

import history from '../../common/history'
import authCheckRedirect from '../../common/authCheckRedirect'
import documentTitle from '../../common/documentTitle'

import TC from '../constants/TabConstants.js'

import Loading from '../../base/components/Loading'
import MenuItemModal from '../components/modals/MenuItemModal'
import Stats from '../components/Stats'
import MenuLayout from '../components/MenuLayout'
import OnTheMenu from '../components/OnTheMenu'

import * as MenuItemActions from '../actions/MenuItemActions'
import { fetchRecipeList } from '../actions/RecipeListActions'
import { menuItemValidation } from '../actions/validation'

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

  changeTab = (tab) => {
    this.setState({tab});
  };

  componentDidMount() {
    authCheckRedirect();
    documentTitle('Menu');
    this.props.menuItemActions.loadItems();
    this.props.menuItemActions.loadStats();
  }

  componentWillUnmount() {
    documentTitle();
  }

  render() {
    const { menuItems, location, stats } = this.props;
    const { menuItemActions } = this.props;
    const { showItemModal, editMenuItemEventId, startDate, endDate, tab } = this.state;
    const query = qs.parse(location.search);

    if (menuItems !== null) {
      let events = menuItems.map(item => {
        return {
          ...item,
          allDay: item.all_day,
          start: moment(item.start_date).toDate(),
          end: moment(item.end_date).toDate(),
        }
      });

      return (
        <MenuLayout tab={tab} changeTab={this.changeTab}>
          <MenuItemModal
            id={ editMenuItemEventId }
            show={ showItemModal }
            onHide={ () => { this.setState({showItemModal: false}) } }
            event={ menuItems.find(t => t.id === editMenuItemEventId) }
            startDate={ startDate }
            endDate={ endDate }
            onSave={ menuItemActions.save }
            onRemove={ menuItemActions.remove }
            fetchRecipeList={ fetchRecipeList }
            validation={ menuItemValidation }
          />
          {tab === TC.Stats ? <Stats stats={stats}/> : ''}
          {tab === TC.OnTheMenu ? <OnTheMenu menuItems={events}/> : ''}
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
  location: PropTypes.object.isRequired,
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
