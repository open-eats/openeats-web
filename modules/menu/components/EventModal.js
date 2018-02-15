import React from 'react'
import { Modal } from 'react-bootstrap'
import { injectIntl, defineMessages } from 'react-intl';

import { Input, DateTime } from '../../common/components/FormComponents'

require('react-datetime/css/react-datetime.css');

const EventModal = ({ show, onHide, event, intl }) => {
  const messages = defineMessages({
    start_date: {
      id: 'men_event_model.start_date',
      description: 'Start Date',
      defaultMessage: 'Start Date',
    },
    end_date: {
      id: 'men_event_model.end_date',
      description: 'End Date',
      defaultMessage: 'End Date',
    },
    recipe: {
      id: 'men_event_model.recipe',
      description: 'Recipe',
      defaultMessage: 'Recipe',
    },
    menu: {
      id: 'men_event_model.menu',
      description: 'Menu',
      defaultMessage: 'Menu',
    },
    new_menu_item: {
      id: 'men_event_model.new_menu_item',
      description: 'Create a new Menu Item',
      defaultMessage: 'Create a new Menu Item',
    },
  });

  let title = intl.formatMessage(messages.new_menu_item);
  let menu = '';
  let recipe = '';
  let startDate = new Date();
  let endDate = new Date();

  if (event) {
    menu = event.menu;
    recipe = event.recipe_title;
    title = event.recipe_title;
    startDate = event.start_date;
    endDate = event.end_date;
  }

  console.log(event);

  return (
    <Modal show={ show } onHide={ onHide }>
      <Modal.Header>
        <Modal.Title>{ title }</Modal.Title>
        <button className="btn btn-danger pull-right">Delete</button>
      </Modal.Header>

      <Modal.Body>
        <Input
          label={ intl.formatMessage(messages.recipe) }
          value={ recipe }
        />
        <Input
          label={ intl.formatMessage(messages.menu) }
          value={ menu }
        />
        <DateTime
          label={ intl.formatMessage(messages.start_date) }
          name="start_date"
          value={ startDate }
        />
        <DateTime
          label={ intl.formatMessage(messages.end_date) }
          name="end_date"
          value={ endDate }
        />
      </Modal.Body>

      <Modal.Footer>
        <button className="btn btn-success">Save</button>
        <button className="btn btn-primary" onClick={ onHide }>Cancel</button>
      </Modal.Footer>
    </Modal>
  )
};

export default injectIntl(EventModal)