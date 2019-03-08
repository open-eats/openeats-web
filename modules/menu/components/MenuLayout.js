import React from 'react'

import Tabs from '../components/Tabs'
import Status from '../containers/Status'

require("../css/menu.scss");

class MenuLayout extends React.Component {
  render() {
    return (
      <div className="container menu-planner">
        <div className="row">
          <div className="col-xs-12">
            <Status/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-2">
            <Tabs
              activeTab={this.props.tab}
              changeTab={this.props.changeTab}
              onMenuItemShow={this.props.onMenuItemShow}
            />
          </div>
          <div className="col-sm-12 col-md-10 content">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default MenuLayout