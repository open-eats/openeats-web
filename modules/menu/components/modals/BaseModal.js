import React from 'react'

class BaseModal extends React.Component {
  validate = (name, value) => {
    let v = this.props.validation.find(t => t.name === name);
    if (v) {
      v.validators.map(t => {
        const error = t(value);
        if (error) {
          let newState = {};
          const key = 'error_' + name;
          newState[key] = error;
          this.setState(this.setState(newState))
        }
        return t;
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
    if (window.confirm(message)) {
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