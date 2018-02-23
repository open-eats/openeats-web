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
import MenuModal from '../components/MenuModal'
import MenuItemModal from '../components/MenuItemModal'

import * as MenuActions from '../actions/MenuActions'
import * as MenuItemActions from '../actions/MenuItemActions'
import { fetchRecipeList } from '../actions/RecipeListActions'

BigCalendar.momentLocalizer(moment);

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
    this.setState({
      showItemModal: true,
      editMenuItemEventId: id,
      startDate: startDate,
      endDate: endDate,
    })
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
    const { showItemModal, editMenuItemEventId, startDate, endDate } = this.state;
    const query = qs.parse(location.search);

    //TODO adding a loading status here so that if there are no menu items the code still works!
    if (menuItems.length > 0) {
      let events = (
        query.menu ?
          menuItems.filter(t => t.menu == query.menu ) :
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
            fetchRecipeList={ fetchRecipeList }
          />
          <BigCalendar
            popup
            selectable
            showMultiDayTimes
            components={ this.getComponents() }
            events={ events }

            view={ query.view || 'month' }
            defaultView={ 'month' }
            onView={ this.buildViewUrl }

            date={ moment(query.date).toDate() }
            defaultDate={ moment(query.date).toDate() || new Date() }
            onNavigate={ this.buildDateUrl }

            onSelectEvent={ event => this.onMenuItemShow(event.id) }
            onSelectSlot={ slotInfo => this.onMenuItemShow(0, slotInfo.start, slotInfo.end) }
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

const mapDispatchToProps = dispatch => ({
  menuActions: bindActionCreators(MenuActions, dispatch),
  menuItemActions: bindActionCreators(MenuItemActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
