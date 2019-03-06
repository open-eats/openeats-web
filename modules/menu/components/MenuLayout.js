import React from 'react'

import Tabs from '../components/Tabs'
import Status from '../containers/Status'

class MenuLayout extends React.Component {
  render() {
    return (
      <div className="container calendar">
        <div className="row">
          <div className="col-xs-12">
            <Status/>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <Tabs activeTab={this.props.tab} changeTab={this.props.changeTab}/>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <button onClick={() => this.props.onMenuItemShow(0)}>New Menu Item</button>
          </div>
          <div className="col-xs-12">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default MenuLayout