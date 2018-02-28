import React from 'react'
import { Modal } from 'react-bootstrap'
import { injectIntl, defineMessages } from 'react-intl';

import BaseModal from './BaseModal'
import { DateTime } from '../../../common/components/DateTime'
import { Input, TextArea } from '../../../common/components/FormComponents'

require('../../css/rbc-calendar-modal.scss');

class MenuModal extends BaseModal {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      start: new Date(),
      description: '',
      placeholder: this.props.intl.messages['men_event_model.new_menu'],
    };
  }

  componentWillReceiveProps(nextProps) {
    let { event } = nextProps;

    let title = '';
    let description = '';

    if (event) {
      title = event.title;
      description = event.description;
    }

    this.setState({
      title: title,
      description: description,
    });
  }

  render () {
    let { show, onHide, intl } = this.props;
    let { title, description, placeholder, start } = this.state;
    const messages = defineMessages({
      title: {
        id: 'men_copy_event_model.title',
        description: 'Title',
        defaultMessage: 'Title',
      },
      description: {
        id: 'men_copy_event_model.end_date',
        description: 'Description',
        defaultMessage: 'Description',
      },
      new_menu: {
        id: 'men_copy_event_model.new_menu',
        description: 'Create a copy of a Menu',
        defaultMessage: 'Create a copy of a Menu',
      },
      start: {
        id: 'men_event_model.start',
        description: 'Menu Start',
        defaultMessage: 'Menu Start',
      },
    });

    return (
      <Modal show={ show } onHide={ onHide } className="rbc-calendar-modal">
        <Modal.Header>
          <Modal.Title>{ placeholder }</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Input
            name="title"
            value={ title }
            change={ this.change }
            label={ intl.formatMessage(messages.title) }
            errors={ this.state['error_title'] }
          />
          <TextArea
            name="description"
            value={ description }
            change={ this.change }
            label={ intl.formatMessage(messages.description) }
            errors={ this.state['error_description'] }
          />
          <DateTime
            name="start"
            value={ start }
            timeFormat={ false }
            change={ this.change }
            label={ intl.formatMessage(messages.start) }
            errors={ this.state['error_start'] }
          />
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-success" onClick={ this.save }>Clone</button>
          <button className="btn btn-primary" onClick={ onHide }>Cancel</button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default injectIntl(MenuModal)