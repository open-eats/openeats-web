import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment';

require('react-big-calendar/lib/css/react-big-calendar.css');
require('../css/rbc-calendar.scss');

BigCalendar.momentLocalizer(moment);
const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

const Basic = ({ items }) => {
  const events = items.map(item => {
    return {
      id: item.id,
      title: item.recipe_title,
      // allDay: true,
      start: new Date(2018, 1, 12),
      end: new Date(2018, 1, 12),
    }
  });
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