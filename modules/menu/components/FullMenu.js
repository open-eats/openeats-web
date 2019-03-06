import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import OnTheMenu from './OnTheMenu'

const FullMenu = ({ menuItems, completeMenuItem, editMenuItem }) => {
  let groups = menuItems.reduce((acc, menuItem) => {
    let date = menuItem.start_date;
    let yearWeek = moment(date).year()+'-'+moment(date).week();
    if (typeof acc[yearWeek] === 'undefined') {
      acc[yearWeek] = [];
    }
    acc[yearWeek].push(menuItem);
    return acc;
  }, {});

  return (
    <div>
      { Object.keys(groups).map((key) => (
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
  )
};

FullMenu.propTypes = {
  menuItems: PropTypes.array.isRequired,
  completeMenuItem: PropTypes.func.isRequired,
  editMenuItem: PropTypes.func.isRequired,
};

export default FullMenu