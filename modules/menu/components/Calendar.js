import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

import RecipeEvent from './RecipeEvent'
import RecipeToolBar from './RecipeToolBar'

require('react-big-calendar/lib/css/react-big-calendar.css');
require('../css/rbc-calendar.scss');

BigCalendar.momentLocalizer(moment);

const Calendar = ({ items, onShow, qs }) => {
  const events = items.map(item => {
    return {
      ...item,
      // allDay: true,
      start: moment(item.start_date).toDate(),
      end: moment(item.end_date).toDate(),
    }
  });

  let components = {
    event: RecipeEvent, // used by each view (Month, Day, Week)
    // toolbar: RecipeToolBar,
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
            defaultView={ qs.view || 'month' }
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
