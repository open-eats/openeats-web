import React from 'react'
import PropTypes from 'prop-types'
import TC from '../constants/TabConstants.js'

const Tab = ({ changeTab, activeTab }) => (
  <ul className="nav nav-pills nav-justified">
    <li role="presentation" onClick={() => changeTab(TC.Stats)} className={activeTab === TC.Stats ? "active" : ""}>
      <a>Stats</a>
    </li>
    <li role="presentation" onClick={() => changeTab(TC.ThisWeek)} className={activeTab === TC.ThisWeek ? "active" : ""}>
      <a>This Week</a>
    </li>
    <li role="presentation" onClick={() => changeTab(TC.NextWeek)} className={activeTab === TC.NextWeek ? "active" : ""}>
      <a>Next Week</a>
    </li>
  </ul>
);

Tab.propTypes = {
  changeTab: PropTypes.func,
  activeTab: PropTypes.string,
};

export default Tab