import React from 'react'
import { Modal } from 'react-bootstrap'
import { injectIntl, defineMessages } from 'react-intl';

import { Input, TextArea } from '../../common/components/FormComponents'

require('../css/rbc-calendar-modal.scss');

class MenuModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    let { event } = nextProps;

    let title = this.props.intl.messages['men_event_model.new_menu'];
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

  onChange = (name, value) => {
    let newState = {};
    newState[name] = value;
    this.setState(newState)
  };

  remove = (message) => {
    if (confirm(message)) {
      this.props.menuActions.remove(this.props.id);
      this.props.onHide();
    }
  };

  save = () => {
    this.props.menuActions.save(this.props.id, this.state);
    this.props.onHide();
  };

  render () {
    let { show, onHide, intl } = this.props;
    let { title, description } = this.state;
    const messages = defineMessages({
      title: {
        id: 'men_event_model.title',
        description: 'Title',
        defaultMessage: 'Title',
      },
      description: {
        id: 'men_event_model.end_date',
        description: 'Description',
        defaultMessage: 'Description',
      },
      new_menu: {
        id: 'men_event_model.new_menu',
        description: 'Create a new Menu',
        defaultMessage: 'Create a new Menu',
      },
      confirmDelete: {
        id: 'men_event_model.confirm_delete',
        description: 'Are you sure you want to delete this?',
        defaultMessage: 'Are you sure you want to delete this?',
      },
    });

    return (
      <Modal show={ show } onHide={ onHide } className="rbc-calendar-modal">
        <Modal.Header>
          <Modal.Title>{ title }</Modal.Title>
          <button
            className="btn btn-danger pull-right"
            onClick={
              this.remove.bind(this, intl.formatMessage(messages.confirmDelete))
            }
          >
            <span className="glyphicon glyphicon-trash" />
          </button>
        </Modal.Header>

        <Modal.Body>
          <Input
            name="title"
            value={ title }
            change={ this.onChange }
            label={ intl.formatMessage(messages.title) }
          />
          <TextArea
            name="description"
            value={ description }
            change={ this.onChange }
            label={ intl.formatMessage(messages.description) }
          />
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-success" onClick={ this.save }>Save</button>
          <button className="btn btn-primary" onClick={ onHide }>Cancel</button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default injectIntl(MenuModal)