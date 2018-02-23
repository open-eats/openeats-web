import React from 'react'
import Calendar from '../containers/Calendar'

require('react-big-calendar/lib/css/react-big-calendar.css');
require('../css/rbc-calendar.scss');

const Menu = (location) => (
  <div className="container">
    <div className="row">
      <div className="col-xs-12">
        <Calendar location={location.location}/>
      </div>
    </div>
  </div>
);

export default Menu