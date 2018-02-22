import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import querystring from 'query-string'
// import { injectIntl, defineMessages } from 'react-intl';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import history from '../../common/history'
import RecipeEvent from './RecipeEvent'
import RecipeToolbar from './RecipeToolbar'

require('react-big-calendar/lib/css/react-big-calendar.css');
require('../css/rbc-calendar.scss');

BigCalendar.momentLocalizer(moment);

const Calendar = ({ items, onMenuShow, onMenuItemShow, qs }) => {
  const events = items.map(item => {
    return {
      ...item,
      allDay: item.all_day,
      start: moment(item.start_date).toDate(),
      end: moment(item.end_date).toDate(),
    }
  });

  let buildViewUrl = value => {
    let parsed = querystring.parse(location.search);
    parsed['view'] = value;
    history.push('/menu/?' + querystring.stringify(parsed));
  };

  let buildDateUrl = value => {
    let parsed = querystring.parse(location.search);
    parsed['date'] = moment(value).format('YYYY-MM-DD');
    history.push('/menu/?' + querystring.stringify(parsed));
  };

  let buildVisibilityUrl = (name, value) => {
    let parsed = querystring.parse(location.search);
    if (value) {
      parsed['menu'] = value;
    } else {
      delete parsed['menu'];
    }
    history.push('/menu/?' + querystring.stringify(parsed));
  };

  const mapStateToProps = state => ({
    menus: state.menu.menus,
    qs: qs,
  });

  const mapDispatchToProps = dispatch => ({
    buildVisibilityUrl: buildVisibilityUrl,
    onMenuShow: onMenuShow,
  });

  let components = {
    event: RecipeEvent, // used by each view (Month, Day, Week)
    toolbar: connect(mapStateToProps, mapDispatchToProps)(RecipeToolbar),
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

            view={ qs.view || 'month' }
            defaultView={ 'month' }
            onView={ buildViewUrl }

            date={ moment(qs.date).toDate() }
            defaultDate={ moment(qs.date).toDate() || new Date() }
            onNavigate={ buildDateUrl }

            onSelectEvent={ event => onMenuItemShow(event.id) }
            onSelectSlot={ slotInfo => onMenuItemShow(0, slotInfo.start, slotInfo.end) }
          />
        </div>
      </div>
    </div>
  )
};

export default Calendar
