import React from 'react'
import PropTypes from 'prop-types'
import TC from '../constants/TabConstants.js'

const Tab = ({ changeTab, activeTab }) => (
  <ul className="nav nav-pills nav-justified">
    <li role="presentation" onClick={() => changeTab(TC.Stats)} className={activeTab === TC.Stats ? "active" : ""}>
      <a>History</a>
    </li>
    <li role="presentation" onClick={() => changeTab(TC.OnTheMenu)} className={activeTab === TC.OnTheMenu ? "active" : ""}>
      <a>On The Menu</a>
    </li>
  </ul>
);

Tab.propTypes = {
  changeTab: PropTypes.func,
  activeTab: PropTypes.string,
};

export default Tab