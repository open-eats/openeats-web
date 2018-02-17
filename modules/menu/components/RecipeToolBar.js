import PropTypes from 'prop-types'
import React from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import { navigate } from 'react-big-calendar/lib/utils/constants'
import qs from 'query-string'

class Toolbar extends React.Component {
  static propTypes = {
    view: PropTypes.string.isRequired,
    views: PropTypes.arrayOf(PropTypes.string).isRequired,
    label: PropTypes.node.isRequired,
    messages: PropTypes.object,
    onNavigate: PropTypes.func.isRequired,
    onViewChange: PropTypes.func.isRequired,
  };

  render() {
    let { messages, label } = this.props;

    return (
      <div className="rbc-toolbar">
        <span className="btn-group">
          <Link
            to={'/menu/?day=' + 'asd'}
            className="btn btn-default"
            onClick={this.navigate.bind(null, navigate.TODAY)}
          >
            {messages.today}
          </Link>
          <Link
            to={'/menu/?day=' + 'asd'}
            className="btn btn-default"
            onClick={this.navigate.bind(null, navigate.PREVIOUS)}
          >
            {messages.previous}
          </Link>
          <Link
            to={'/menu/?day=' + 'asd'}
            className="btn btn-default"
            onClick={this.navigate.bind(null, navigate.NEXT)}
          >
            {messages.next}
          </Link>
        </span>

        <span className="rbc-toolbar-label">{label}</span>

        <span className="btn-group">{this.viewNamesGroup(messages)}</span>
      </div>
    )
  }

  navigate = action => {
    this.props.onNavigate(action)
  };

  view = view => {
    this.props.onViewChange(view)
  };

  viewNamesGroup(messages) {
    let viewNames = this.props.views;
    const view = this.props.view;

    if (viewNames.length > 1) {
      return viewNames.map(name => {
        let parsed = qs.parse(this.props.location.search);
        parsed.view = name;
        return (
          <Link
              to={'/menu/?' + qs.stringify(parsed)}
              type="button"
              key={name}
              className={cn({'rbc-active': view === name, 'btn btn-default': true})}
              onClick={this.view.bind(null, name)}
          >
            {messages[name]}
          </Link>
        )
      })
    }
  }
}

export default Toolbar