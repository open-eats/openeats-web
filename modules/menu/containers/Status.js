import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as MenuStatusActions from '../actions/MenuStatusActions'
import StatusBar from '../components/StatusBar'

class Status extends React.Component {
  render() {
    let { status, menuStatusActions } = this.props;

    return (
      <StatusBar
        alert={ '' }
        message={ status }
        close={ menuStatusActions.close }
      />
    );
  }
}

// Menu.propTypes = {
//   menus: PropTypes.array,
//   menuItems: PropTypes.array,
//   menuActions: PropTypes.object.isRequired,
//   menuItemActions: PropTypes.object.isRequired,
//   location: PropTypes.object.isRequired,
// };

const mapStateToProps = state => ({
  status: state.menu.status,
});

const mapDispatchToProps = dispatch => ({
  menuStatusActions: bindActionCreators(MenuStatusActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Status);
