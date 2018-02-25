import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'
import classes from 'dom-helpers/class'
import getWidth from 'dom-helpers/query/width'
import scrollbarSize from 'dom-helpers/util/scrollbarSize'

import localizer from 'react-big-calendar/lib/localizer'
import message from 'react-big-calendar/lib/utils/messages'
import dates from 'react-big-calendar/lib/utils/dates'
import { navigate } from 'react-big-calendar/lib/utils/constants'
import { accessor as get } from 'react-big-calendar/lib/utils/accessors'
import { accessor, dateFormat, dateRangeFormat } from 'react-big-calendar/lib/utils/propTypes'
import { inRange } from 'react-big-calendar/lib/utils/eventLevels'
import { isSelected } from 'react-big-calendar/lib/utils/selection'

class Agenda extends React.Component {
  static propTypes = {
    events: PropTypes.array,
    titleAccessor: accessor.isRequired,
    tooltipAccessor: accessor.isRequired,
    allDayAccessor: accessor.isRequired,
    startAccessor: accessor.isRequired,
    endAccessor: accessor.isRequired,
    eventPropGetter: PropTypes.func,
    selected: PropTypes.object,

    agendaDateFormat: dateFormat,
    agendaTimeFormat: dateFormat,
    agendaTimeRangeFormat: dateRangeFormat,
    culture: PropTypes.string,

    components: PropTypes.object.isRequired,
    messages: PropTypes.shape({
      date: PropTypes.string,
      time: PropTypes.string,
    }),
  };

  componentDidMount() {
    this._adjustHeader()
  }

  componentDidUpdate() {
    this._adjustHeader()
  }

  render() {
    let { events, startAccessor, messages } = this.props;
    events.sort((a, b) => +get(a, startAccessor) - +get(b, startAccessor));

    return (
      <div className="rbc-agenda-view">
        <table ref="header">
          <thead>
            <tr>
              <th className="rbc-header" ref="dateCol">
                {messages.date}
              </th>
              <th className="rbc-header" ref="timeCol">
                {messages.time}
              </th>
              <th className="rbc-header">{messages.event}</th>
            </tr>
          </thead>
        </table>
        <div className="rbc-agenda-content" ref="content">
          <table>
            <tbody ref="tbody">
              { this.renderDay(events) }
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  renderDay = (events) => {
    let {
      culture,
      components,
      titleAccessor,
      agendaDateFormat,
      eventPropGetter,
      startAccessor,
      endAccessor,
      selected,
    } = this.props;

    let EventComponent = components.event;
    let DateComponent = components.date;

    return events.map((event, idx) => {
      const { className, style } = eventPropGetter
        ? eventPropGetter(
            event,
            get(event, startAccessor),
            get(event, endAccessor),
            isSelected(event, selected)
          )
        : {};

      let dateLabel =
        idx === 0 && localizer.format(event.startDate, agendaDateFormat, culture)
      let first =
        idx === 0 ? (
          <td rowSpan={events.length} className="rbc-agenda-date-cell">
            {DateComponent ? (
              <DateComponent day={event.startDate} label={dateLabel} />
            ) : (
              dateLabel
            )}
          </td>
        ) : (
          false
        )

      let title = get(event, titleAccessor)
      return (
        <tr key={event.startDate} className={className} style={style}>
          {first}
          <td className="rbc-agenda-time-cell">
            {this.timeRangeLabel(event.startDate, event)}
          </td>
          <td className="rbc-agenda-event-cell">
            {EventComponent ? (
              <EventComponent event={event} title={title} />
            ) : (
              title
            )}
          </td>
        </tr>
      );
    })
  };

  timeRangeLabel = (day, event) => {
    let {
      endAccessor,
      startAccessor,
      allDayAccessor,
      culture,
      messages,
      components,
    } = this.props

    let labelClass = '',
      TimeComponent = components.time,
      label = message(messages).allDay

    let start = get(event, startAccessor)
    let end = get(event, endAccessor)

    if (!get(event, allDayAccessor)) {
      if (dates.eq(start, end, 'day')) {
        label = localizer.format(
          { start, end },
          this.props.agendaTimeRangeFormat,
          culture
        )
      } else if (dates.eq(day, start, 'day')) {
        label = localizer.format(start, this.props.agendaTimeFormat, culture)
      } else if (dates.eq(day, end, 'day')) {
        label = localizer.format(end, this.props.agendaTimeFormat, culture)
      }
    }

    if (dates.gt(day, start, 'day')) labelClass = 'rbc-continues-prior'
    if (dates.lt(day, end, 'day')) labelClass += ' rbc-continues-after'

    return (
      <span className={labelClass.trim()}>
        {TimeComponent ? (
          <TimeComponent event={event} day={day} label={label} />
        ) : (
          label
        )}
      </span>
    )
  }

  _adjustHeader = () => {
    let header = this.refs.header
    let firstRow = this.refs.tbody.firstChild

    if (!firstRow) return

    let isOverflowing =
      this.refs.content.scrollHeight > this.refs.content.clientHeight
    let widths = this._widths || []

    this._widths = [
      getWidth(firstRow.children[0]),
      getWidth(firstRow.children[1]),
    ]

    if (widths[0] !== this._widths[0] || widths[1] !== this._widths[1]) {
      this.refs.dateCol.style.width = this._widths[0] + 'px'
      this.refs.timeCol.style.width = this._widths[1] + 'px'
    }

    if (isOverflowing) {
      classes.addClass(header, 'rbc-header-overflowing')
      header.style.marginRight = scrollbarSize() + 'px'
    } else {
      classes.removeClass(header, 'rbc-header-overflowing')
    }
  }
}

// Agenda.navigate = () => '';
Agenda.title = () => '';

// Agenda.title = (
//   start,
//   { length = Agenda.defaultProps.length, formats, culture }
// ) => {
//   let end = dates.add(start, length, 'day')
//   return localizer.format({ start, end }, formats.agendaHeaderFormat, culture)
// }

export default Agenda