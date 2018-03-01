import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { navigate } from 'react-big-calendar/lib/utils/constants'

import { Select } from '../../common/components/FormComponents'

class Toolbar extends React.Component {
  static propTypes = {
    view: PropTypes.string.isRequired,
    views: PropTypes.arrayOf(PropTypes.string).isRequired,
    label: PropTypes.node.isRequired,
    messages: PropTypes.object,
    menus: PropTypes.array,
    qs: PropTypes.object,
    onNavigate: PropTypes.func.isRequired,
    onViewChange: PropTypes.func.isRequired,
    onMenuShow: PropTypes.func.isRequired,
    buildVisibilityUrl: PropTypes.func.isRequired,
  };

  render() {
    let { messages, label, menus, qs } = this.props;
    let { onMenuShow, onCopyMenuShow, buildVisibilityUrl } = this.props;

    const menuButtons = () => (
      <span>
        <span className="menu-edit-buttons">
          <span
            className="glyphicon glyphicon-pencil"
            onClick={onMenuShow.bind(this, qs.menu)}
          />
        </span>
        <span className="menu-edit-buttons">
          <span
            className="glyphicon glyphicon-copy"
            onClick={onCopyMenuShow.bind(this, qs.menu)}
          />
        </span>
      </span>
    );

    const menuSpace = () => (
      <span className="glyphicon glyphicon-space"/>
    );

    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <button
            type="button"
            onClick={this.navigate.bind(null, navigate.TODAY)}
          >
            {messages.today}
          </button>
          <button
            type="button"
            onClick={this.navigate.bind(null, navigate.PREVIOUS)}
          >
            {messages.previous}
          </button>
          <button
            type="button"
            onClick={this.navigate.bind(null, navigate.NEXT)}
          >
            {messages.next}
          </button>
        </span>

        <span className="rbc-toolbar-label">
          <div>{ label }</div>
          <div className="menus-group">
            <span className="new-menu">
              <span
                className="glyphicon glyphicon-plus"
                onClick={ onMenuShow.bind(this, 0) }
              />
            </span>
            <Select
              name="menu-filter"
              size="menu-selector"
              value={ qs.menu || '' }
              data={ menus }
              default="All Menus"
              change={ buildVisibilityUrl }
            />
            { qs.menu ? menuButtons() : menuSpace() }
          </div>
        </span>

        <span className="rbc-btn-group">{this.viewNamesGroup(messages)}</span>
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
      return viewNames.map(name => (
        <button
          type="button"
          key={name}
          className={cn({ 'rbc-active': view === name })}
          onClick={this.view.bind(null, name)}
        >
          {messages[name]}
        </button>
      ))
    }
  }
}

export default Toolbar