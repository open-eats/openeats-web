import React from 'react'
import { Modal } from 'react-bootstrap'
import { injectIntl, defineMessages } from 'react-intl';

import { Checkbox } from '../../common/components/FormComponents'
import { DateTime } from '../../common/components/DateTime'
import { Async, Select } from '../../common/components/Select'

require('../css/rbc-calendar-modal.scss');

class MenuItemModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: '',
      recipe: '',
      title: '',
      start_date: '',
      end_date: '',
      all_day: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    let { event, startDate, endDate } = nextProps;

    let title = this.props.intl.messages['men_item_event_model.new_menu_item'];
    let menu = '';
    let recipe = '';
    let start_date = startDate || new Date();
    let end_date = endDate || new Date();
    let all_day = false;

    if (event) {
      menu = event.menu;
      recipe = event.recipe_title;
      title = event.recipe_title;
      start_date = event.start_date;
      end_date = event.end_date;
      all_day = event.all_day;
    }

    this.setState({
      menu: menu,
      recipe: recipe,
      title: title,
      start_date: start_date,
      end_date: end_date,
      all_day: all_day,
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
    let { show, onHide, fetchRecipeList, menus, intl } = this.props;
    let { menu, recipe, title, start_date, end_date, all_day } = this.state;
    const messages = defineMessages({
      start_date: {
        id: 'men_item_event_model.start_date',
        description: 'Start Date',
        defaultMessage: 'Start Date',
      },
      end_date: {
        id: 'men_item_event_model.end_date',
        description: 'End Date',
        defaultMessage: 'End Date',
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
      all_day: {
        id: 'men_item_event_model.all_day',
        description: 'Anytime today',
        defaultMessage: 'Anytime today',
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
          <Modal.Title>{ title }</Modal.Title>
          <button
            className="btn btn-danger pull-right"
            onClick={
              this.remove.bind(this, intl.formatMessage(messages.confirmDelete))
            }
          >
            <span className="glyphicon glyphicon-trash"/>
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
            timeFormat={ !all_day }
          />
          <DateTime
            label={ intl.formatMessage(messages.end_date) }
            name="end_date"
            value={ end_date }
            change={ this.onChange }
            timeFormat={ !all_day }
          />
          <Checkbox
            label={ intl.formatMessage(messages.all_day) }
            name="all_day"
            checked={ all_day }
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

export default injectIntl(MenuItemModal)