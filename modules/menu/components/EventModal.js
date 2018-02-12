import React from 'react'
import { Modal } from 'react-bootstrap'
import Datetime from 'react-datetime'

require('react-datetime/css/react-datetime.css');

const EventModal = ({ show, onHide, event }) => (
  <Modal show={ show } onHide={ onHide }>
    <Modal.Header>
      <Modal.Title>{ event.recipe_title }</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <Datetime />
      <Datetime />
    </Modal.Body>

    <Modal.Footer>
      {/*<Button>Close</Button>*/}
      {/*<Button bsStyle="primary">Save changes</Button>*/}
    </Modal.Footer>
  </Modal>
);

export default EventModal