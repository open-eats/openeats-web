import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Popover, OverlayTrigger } from 'react-bootstrap'
import {
  injectIntl,
  defineMessages,
} from 'react-intl';

class TabbedView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display: this.props.display || 0,
    };
  }

  switchView = val => {
    this.setState({ display: val })
  };

  render() {
    const { formatMessage } = this.props.intl;
    const messages = defineMessages({
      preview: {
        id: 'recipe.create.preview',
        description: 'Preview',
        defaultMessage: 'Preview',
      },
      editor: {
        id: 'recipe.create.editor',
        description: 'Editor',
        defaultMessage: 'Editor',
      },
    });

    let { children, label, infoTitle, infoDesc, errors } = this.props;
    let { display } = this.state;

    let contentClassName = classNames({
      'content': true,
      'has-error': !!this.props.errors
    });

    let navClassName = classNames({
      'nav': true,
      'nav-tabs': true,
      'has-error': !!this.props.errors
    });

    const popoverHoverFocus = (
      <Popover id="help" title={ infoTitle }>
        { infoDesc }
      </Popover>
    );

    return (
      <div className="live-editor">
        <ul className={ navClassName }>
          <li className={ classNames({ left: true, active: true })}>
            <span>
              { label }
              &nbsp;
              <OverlayTrigger
                  trigger={['hover']}
                  placement="top"
                  overlay={ popoverHoverFocus }
              >
                <span className="glyphicon glyphicon-info-sign"/>
              </OverlayTrigger>
            </span>
          </li>
          <li className={ classNames({ active: display === 0 })}>
            <span onClick={ this.switchView.bind(this, 0) }>
              { formatMessage(messages.editor) }
            </span>
          </li>
          <li className={ classNames({ active: display === 1 })}>
            <span onClick={ this.switchView.bind(this, 1) }>
              { formatMessage(messages.preview) }
            </span>
          </li>
        </ul>
        <div className={ contentClassName }>{ children[display] }</div>
        <div className="help-inline">{ errors }</div>
      </div>
    )
  }
}

TabbedView.PropTypes = {
  label: PropTypes.string.isRequired,
  display: PropTypes.number,
  errors: PropTypes.string,
  className: PropTypes.string,
  infoTitle: PropTypes.string,
  infoDesc: PropTypes.string,
  intl: PropTypes.obj,
};

export default injectIntl(TabbedView)
