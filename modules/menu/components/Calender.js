import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment';

import RecipeEvent from './RecipeEvent'

require('react-big-calendar/lib/css/react-big-calendar.css');
require('../css/rbc-calendar.scss');

BigCalendar.momentLocalizer(moment);

const Basic = ({ items }) => {
  const events = items.map(item => {
    return {
      id: item.id,
      title: item.recipe_title,
      recipe: item.recipe,
      // allDay: true,
      start: new Date(2018, 1, 12),
      end: new Date(2018, 1, 12),
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
            // defaultDate={ new Date(2015, 3, 1) }
            // defaultView="week"
            // onSelectEvent={event => alert(event.title)}
            onSelectSlot={slotInfo =>
              alert(
                `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                  `\nend: ${slotInfo.end.toLocaleString()}` +
                  `\naction: ${slotInfo.action}`
              )
            }
          />
        </div>
      </div>
    </div>
  )
};

export default Basic