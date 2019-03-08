import React from 'react'
import moment from 'moment'
import { Modal } from 'react-bootstrap'
import { injectIntl, defineMessages } from 'react-intl';

import BaseModal from './BaseModal'
import { Checkbox } from '../../../common/components/FormComponents'
import { DateTime } from '../../../common/components/DateTime'
import { Async } from '../../../common/components/Select'

class MenuItemModal extends BaseModal {
  constructor(props) {
    super(props);

    this.state = {
      recipe: this.props.recipe || '',
      title: this.props.title || '',
      start_date: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    let { event, startDate } = nextProps;

    let title = this.props.title;
    let placeholder = this.props.intl.messages['men_item_event_model.new_menu_item'];
    let recipe = this.props.recipe;
    let start_date = startDate || new Date();
    let complete = false;

    if (event) {
      recipe = event.recipe_data.id;
      title = event.recipe_data.title;
      placeholder = event.recipe_data.title;
      start_date = event.start_date;
      complete = event.complete;
    }

    this.setState({
      recipe: recipe,
      placeholder: placeholder,
      title: title,
      start_date: start_date,
      complete: complete,
    });
  }

  onStateDateChange = (name, value) => {
    this.validate(name, value);
    value = moment(value);
    let newState = {};
    newState[name] = value;
    this.setState(newState)
  };

  render () {
    let { id, show, onHide, fetchRecipeList, intl } = this.props;
    let { recipe, title, placeholder, start_date, complete } = this.state;
    const messages = defineMessages({
      start_date: {
        id: 'men_item_event_model.start_date',
        description: 'Start Date',
        defaultMessage: 'Start Date',
      },
      recipe: {
        id: 'men_item_event_model.recipe',
        description: 'Recipe',
        defaultMessage: 'Recipe',
      },
      menu: {
        id: 'men_item_event_model.menu',
        description: 'Menu',
        defaultMessage: 'Menu',
      },
      complete: {
        id: 'men_item_event_model.complete',
        description: 'Complete',
        defaultMessage: 'Complete',
      },
      new_menu_item: {
        id: 'men_item_event_model.new_menu_item',
        description: 'Create a new Menu Item',
        defaultMessage: 'Create a new Menu Item',
      },
      confirmDelete: {
        id: 'men_item_event_model.confirm_delete',
        description: 'Are you sure you want to delete this?',
        defaultMessage: 'Are you sure you want to delete this?',
      },
    });

    return (
      <Modal show={ show } onHide={ onHide } className="rbc-calendar-modal">
        <Modal.Header>
          <Modal.Title>{ placeholder }</Modal.Title>
          {id !== 0 ?
            <div
              className="btn btn-danger pull-right"
              onClick={
                this.remove.bind(this, intl.formatMessage(messages.confirmDelete))
              }
            >
              <span className="glyphicon glyphicon-trash"/>
            </div> : ''
          }
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <Async
              class="col-xs-12"
              name="recipe"
              title="title"
              label={ intl.formatMessage(messages.recipe) }
              value={ recipe ? { value: recipe, label: title } : null }
              change={ this.change }
              loadOptions={ fetchRecipeList }
              errors={ this.state['error_recipe'] }
            />
            <DateTime
              class="col-xs-12"
              label={ intl.formatMessage(messages.start_date) }
              name="start_date"
              value={ start_date }
              change={ this.onStateDateChange }
              timeFormat={ false }
              errors={ this.state['error_start_date'] }
            />
            <Checkbox
              size="col-xs-12"
              label={ intl.formatMessage(messages.complete) }
              name="complete"
              checked={ complete }
              change={ this.change }
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-success" onClick={ this.save }>Save</button>
          <button className="btn btn-primary" onClick={ onHide }>Cancel</button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default injectIntl(MenuItemModal)
