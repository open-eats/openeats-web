import React from 'react'

require('../../css/rbc-calendar-modal.scss');

class BaseModal extends React.Component {
  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     menu: '',
  //     recipe: '',
  //     title: '',
  //     start_date: '',
  //     end_date: '',
  //     all_day: '',
  //   };
  // }
  //
  // componentWillReceiveProps(nextProps) {
  //   let { event, startDate, endDate } = nextProps;
  //
  //   let title = '';
  //   let placeholder = this.props.intl.messages['men_item_event_model.new_menu_item'];
  //   let menu = '';
  //   let recipe = '';
  //   let start_date = startDate || new Date();
  //   let end_date = endDate || new Date();
  //   let all_day = false;
  //
  //   if (event) {
  //     menu = event.menu;
  //     recipe = event.recipe;
  //     title = event.recipe_title;
  //     placeholder = event.recipe_title;
  //     start_date = event.start_date;
  //     end_date = event.end_date;
  //     all_day = event.all_day;
  //   }
  //
  //   this.setState({
  //     menu: menu,
  //     recipe: recipe,
  //     placeholder: placeholder,
  //     title: title,
  //     start_date: start_date,
  //     end_date: end_date,
  //     all_day: all_day,
  //   });
  // }

  validate = (name, value) => {
    let v = this.props.validation.find(t => t.name === name);
    if (v) {
      v.validators.map(t => {
        if (t(value)) {
          let newState = {};
          const key = 'error_' + name;
          newState[key] = value;
          this.setState(this.setState(newState))
        }
      });
    }
  };

  change = (name, value) => {
    this.validate(name, value);
    let newState = {};
    newState[name] = value;
    this.setState(newState)
  };

  remove = (message) => {
    if (confirm(message)) {
      this.props.onRemove(this.props.id);
      this.props.onHide();
    }
  };

  save = (e) => {
    e.preventDefault();
    this.props.onSave(this.props.id, this.state);
    this.props.onHide();
  };

}

export default BaseModal