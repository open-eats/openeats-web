import React from 'react'
import { Modal } from 'react-bootstrap'
import { injectIntl, defineMessages } from 'react-intl';

import { DateTime } from '../../common/components/DateTime'
import { Async, Select } from '../../common/components/Select'
import { fetchRecipeList } from '../actions/RecipeListActions'

require('../css/rbc-calendar-modal.scss');

class EventModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: '',
      recipe: '',
      title: '',
      start_date: '',
      end_date: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    let { event, startDate, endDate } = nextProps;

    // let title = intl.formatMessage(messages.new_menu_item);
    let title = 'Create a new Menu Item';
    let menu = '';
    let recipe = '';
    let start_date = startDate || new Date();
    let end_date = endDate || new Date();

    if (event) {
      menu = event.menu;
      recipe = event.recipe_title;
      title = event.recipe_title;
      start_date = event.start_date;
      end_date = event.end_date;
    }

    this.setState({
      menu: menu,
      recipe: recipe,
      title: title,
      start_date: start_date,
      end_date: end_date,
    });
  }

  onChange = (name, value) => {
    let newState = {};
    newState[name] = value;
    this.setState(newState)
  };

  remove = (message) => {
    if (confirm(message)) {
      this.props.menuItemActions.remove(this.props.id);
      this.props.onHide();
    }
  };

  save = () => {
    this.props.menuItemActions.save(this.props.id, this.state);
    this.props.onHide();
  };

  render () {
    let { id, show, onHide, menus, menuItemActions, intl } = this.props;
    let { menu, recipe, title, start_date, end_date } = this.state;
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
            <span
              className="glyphicon glyphicon-trash"
            />
          </button>
        </Modal.Header>

        <Modal.Body>
          <Async
            name="recipe"
            title="title"
            label={ intl.formatMessage(messages.recipe) }
            value={{ value: recipe, label: title }}
            change={ this.onChange }
            loadOptions={ fetchRecipeList }
          />
          <Select
            data={ menus.map(t => { return {value: t.id, label: t.title} }) }
            value={ menu }
            name="menu"
            label={ intl.formatMessage(messages.menu) }
            change={ this.onChange }
          />
          <DateTime
            label={ intl.formatMessage(messages.start_date) }
            name="start_date"
            value={ start_date }
            change={ this.onChange }
          />
          <DateTime
            label={ intl.formatMessage(messages.end_date) }
            name="end_date"
            value={ end_date }
            change={ this.onChange }
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

export default injectIntl(EventModal)