import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment';

import events from './events'

require('react-big-calendar/lib/css/react-big-calendar.css');
require('../css/rbc-calendar.scss');

BigCalendar.momentLocalizer(moment);
const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

const Basic = ({ recipes }) => {
  // const events = recipes;
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <BigCalendar
            events={ events }
            views={ allViews }
            step={ 60 }
            showMultiDayTimes
            // defaultDate={ new Date(2015, 3, 1) }
          />
        </div>
      </div>
    </div>
  )
};

export default Basic