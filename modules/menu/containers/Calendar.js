import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import qs from 'query-string'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

import history from '../../common/history'
import authCheckRedirect from '../../common/authCheckRedirect'
import documentTitle from '../../common/documentTitle'

import Loading from '../../base/components/Loading'
import RecipeEvent from '../components/RecipeEvent'
import RecipeToolbar from '../components/RecipeToolbar'
import MenuModal from '../components/modals/MenuModal'
import MenuCopyModal from '../components/modals/MenuCopyModal'
import MenuItemModal from '../components/modals/MenuItemModal'

import * as MenuActions from '../actions/MenuActions'
import * as MenuItemActions from '../actions/MenuItemActions'
import { fetchRecipeList } from '../actions/RecipeListActions'
import { menuItemValidation, menuValidation, copyMenuValidation } from '../actions/validation'

BigCalendar.momentLocalizer(moment);

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenuModal: false,
      editMenuEventId: 0,
      showCopyMenuModal: false,
      editCopyMenuEventId: 0,
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

  buildViewUrl = value => {
    let parsed = qs.parse(this.props.location.search);
    parsed['view'] = value;
    history.push('/menu/?' + qs.stringify(parsed));
  };

  buildDateUrl = value => {
    let parsed = qs.parse(this.props.location.search);
    parsed['date'] = moment(value).format('YYYY-MM-DD');
    history.push('/menu/?' + qs.stringify(parsed));
  };

  buildVisibilityUrl = (name, value) => {
    let parsed = qs.parse(this.props.location.search);
    if (value) {
      parsed['menu'] = value;
    } else {
      delete parsed['menu'];
    }
    history.push('/menu/?' + qs.stringify(parsed));
  };

  onMenuItemShow = (id, startDate=null, endDate=null) => {
    // TODO add message saying to create a menu
    if (this.props.menus.length > 0) {
      this.setState({
        showItemModal: true,
        editMenuItemEventId: parseInt(id, 10),
        startDate: startDate,
        endDate: endDate,
      })
    }
  };

  getComponents = () => {
    const query = qs.parse(this.props.location.search);
    const mapStateToProps = state => ({
      menus: state.menu.menus,
      qs: query,
    });

    const mapDispatchToProps = dispatch => ({
      buildVisibilityUrl: this.buildVisibilityUrl,
      onMenuShow: id => this.setState({
        showMenuModal: true,
        editMenuEventId: id,
      }),
      onCopyMenuShow: id => this.setState({
        showCopyMenuModal: true,
        editCopyMenuEventId: id,
      })
    });

    return {
      event: RecipeEvent, // used by each view (Month, Day, Week)
      toolbar: connect(mapStateToProps, mapDispatchToProps)(RecipeToolbar),
    };
  };

  render() {
    const { menus, menuItems, location } = this.props;
    const { menuActions, menuItemActions } = this.props;
    const { showMenuModal, editMenuEventId } = this.state;
    const { showCopyMenuModal, editCopyMenuEventId } = this.state;
    const { showItemModal, editMenuItemEventId, startDate, endDate } = this.state;
    const query = qs.parse(location.search);

    if (menuItems !== null) {
      let events = (
        query.menu ?
          menuItems.filter(t => t.menu === parseInt(query.menu, 10) ) :
          menuItems
      ).map(item => {
        return {
          ...item,
          allDay: item.all_day,
          start: moment(item.start_date).toDate(),
          end: moment(item.end_date).toDate(),
        }
      });

      return (
        <div>
          <MenuModal
            id={ editMenuEventId }
            show={ showMenuModal }
            onHide={ () => { this.setState({showMenuModal: false}) } }
            event={ menus.find(t => t.id === editMenuEventId) }
            onSave={ menuActions.save }
            onRemove={ menuActions.remove }
            validation={ menuValidation }
          />
          <MenuCopyModal
            id={ editCopyMenuEventId }
            show={ showCopyMenuModal }
            onHide={ () => { this.setState({showCopyMenuModal: false}) } }
            event={ menus.find(t => t.id === editCopyMenuEventId) }
            onSave={ menuActions.copy }
            validation={ copyMenuValidation }
          />
          <MenuItemModal
            id={ editMenuItemEventId }
            menus={ menus }
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
          <BigCalendar
            popup
            selectable
            showMultiDayTimes
            components={ this.getComponents() }
            events={ events }
            views={{
              month: true,
              week: true,
              day: true,
              agenda: true,
              // The MenuList doesn't have a great direction right now.
              // I'm thinking this should be treated like an admin resource for older menu items.
              // This means that we will need to add pagination to it to make it effective.
              // menu: MenuList,
            }}

            view={ query.view || 'month' }
            defaultView={ 'month' }
            onView={ this.buildViewUrl }

            date={ moment(query.date).toDate() }
            defaultDate={ moment(query.date).toDate() || new Date() }
            onNavigate={ this.buildDateUrl }

            onSelectEvent={ event => this.onMenuItemShow(event.id) }
            onSelectSlot={ slotInfo => this.onMenuItemShow(
                0,
                moment(slotInfo.start),
                moment(slotInfo.end).add(1, 'h')
            )}
          />
        </div>
      );
    } else {
      return ( <Loading message="Loading"/> )
    }
  }
}

Menu.propTypes = {
  menus: PropTypes.array,
  menuItems: PropTypes.array,
  menuActions: PropTypes.object.isRequired,
  menuItemActions: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  menus: state.menu.menus,
  menuItems: state.menu.items,
});

const mapDispatchToProps = dispatch => ({
  menuActions: bindActionCreators(MenuActions, dispatch),
  menuItemActions: bindActionCreators(MenuItemActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
