import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import qs from 'query-string'

import authCheckRedirect from '../../common/authCheckRedirect'
import Loading from '../../base/components/Loading'
import Calender from '../components/Calendar'
import EventModal from '../components/EventModal'
import * as MenuActions from '../actions/MenuActions'
import * as MenuItemActions from '../actions/MenuItemActions'
// import bindIndexToActionCreators from '../../common/bindIndexToActionCreators'
import documentTitle from '../../common/documentTitle'

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      editEventId: 0,
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
    let { showModal, editEventId, startDate, endDate } = this.state;
    //TODO adding a loading status here so that if there are no menu items the code still works!
    if (menuItems.length > 0) {
      return (
        <div>
          <EventModal
            id={ editEventId }
            menus={ menus }
            show={ showModal }
            onHide={ () => { this.setState({showModal: false}) } }
            event={ menuItems.find(t => t.id == editEventId) }
            menuItemActions={ menuItemActions }
            startDate={ startDate }
            endDate={ endDate }
          />
          <Calender
            items={ menuItems }
            qs={ qs.parse(location.search) }
            onShow={ (id, startDate=null, endDate=null) => {
              this.setState({
                showModal: true,
                editEventId: id,
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
