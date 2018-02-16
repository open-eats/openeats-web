import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment';

import RecipeEvent from './RecipeEvent'

require('react-big-calendar/lib/css/react-big-calendar.css');
require('../css/rbc-calendar.scss');

BigCalendar.momentLocalizer(moment);

const Calendar = ({ items, onShow }) => {
  const events = items.map(item => {
    return {
      ...item,
      // allDay: true,
      start_date: moment(item.start_date).toDate(),
      end_date: moment(item.end_date).toDate(),
      start: moment(item.start_date).toDate(),
      end: moment(item.end_date).toDate(),
      onShow: onShow.bind(this, item.id)
    }
  });

  let components = {
    event: RecipeEvent, // used by each view (Month, Day, Week)
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <BigCalendar
            popup
            selectable
            showMultiDayTimes
            components={ components }
            events={ events }
            // step={ 60 }
            // defaultView="week"
            defaultDate={ new Date() }
            onSelectEvent={ event => onShow(event.id) }
            onSelectSlot={ slotInfo => onShow(0, slotInfo.start, slotInfo.end) }
          />
        </div>
      </div>
    </div>
  )
};

export default Calendar
