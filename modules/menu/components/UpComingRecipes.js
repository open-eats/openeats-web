import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import OnTheMenu from './OnTheMenu'
import Menu from "../../news/components/News";

const FullMenu = ({ menuItems, completeMenuItem, editMenuItem }) => {
  let nextWeek = moment().add(1, 'week').startOf('week').format('MMMM D');
  let thisWeek = moment().startOf('week').format('MMMM D');
  let lastWeek = moment().subtract(1, 'week').startOf('week').format('MMMM D');

  let groups = menuItems.reduce((acc, menuItem) => {
    let date = menuItem.start_date;
    let weekStart = moment(date).startOf('week').format('MMMM D');
    let weekEnd = moment(date).endOf('week').format('MMMM D');

    let title = weekStart + ' - ' + weekEnd;
    if (thisWeek === weekStart) {
      title = 'On The Menu This Week (' + title + ')'
    } else if (nextWeek === weekStart) {
      title = 'On The Menu Next Week (' + title + ')'
    } else if (lastWeek === weekStart) {
      title = 'On The Menu Last Week (' + title + ')'
    } else {
      return acc;
    }

    if (typeof acc[title] === 'undefined') {
      acc[title] = [];
    }
    acc[title].push(menuItem);
    return acc;
  }, {});

  if (menuItems.length > 0) {
    return (
      <div className="menu-items">
        <div className="col-xs-12 recipes">
          {Object.keys(groups).map((key) => (
            <div key={key} className="row">
              <h3 className="page-header">{key}</h3>
              <OnTheMenu
                completeMenuItem={completeMenuItem}
                editMenuItem={editMenuItem}
                menuItems={groups[key]}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (<div />)
};

FullMenu.propTypes = {
  menuItems: PropTypes.array.isRequired,
  completeMenuItem: PropTypes.func.isRequired,
  editMenuItem: PropTypes.func.isRequired,
};

export default FullMenu