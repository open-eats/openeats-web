import React from 'react'
import { injectIntl, defineMessages } from 'react-intl';

import '../css/checkbox.scss'

export class BaseComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value || '',
      errors: this.props.errors || false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });

    if(this.props.change) {
      this.props.change(event.target.name, event.target.value);
    }
  }

  hasErrors() {
    return !!this.state.errors;
  }

  getErrorMessage() {
    if (this.hasErrors()) {
      return (
          <span className="help-inline">{ this.state.errors }</span>
      );
    }

    return null;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        value: nextProps.value
      });
    }

    if ('errors' in nextProps) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
}

export class Input extends BaseComponent {
  render() {
    return (
      <div className={ this.props.size } key={ this.props.id }>
        <div className={ "form-group " + (this.hasErrors() ? 'has-error' : null) }>
          { this.props.label ? <label>{this.props.label}</label> : null }
          <input type={ this.props.type }
                 name={ this.props.name }
                 className="form-control"
                 placeholder={ this.props.placeholder }
                 value={ this.state.value }
                 onChange={ this.handleChange }/>
          { this.getErrorMessage() }
        </div>
      </div>
    )
  }
}

export class TextArea extends BaseComponent {
  render() {
    return (
      <div className={ this.props.size } key={ this.props.id }>
        <div className={ "form-group " + (this.hasErrors() ? 'has-error' : null) }>
          { this.props.label ? <label>{this.props.label}</label> : null }
          <textarea type={ this.props.type }
                    name={ this.props.name }
                    rows={ this.props.rows }
                    className="form-control"
                    placeholder={ this.props.placeholder }
                    value={ this.state.value }
                    onChange={ this.handleChange }/>
          { this.getErrorMessage() }
        </div>
      </div>
    )
  }
}

export class FileBase extends BaseComponent {
  handleChange(event) {
    this.setState({
      value: event.target.files[0]
    });

    if(this.props.change) {
      this.props.change(event.target.name, event.target.files[0]);
    }
  }

  render() {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      help_block: {
        id: 'file_widget.help_block',
        description: 'File upload widget help message',
        defaultMessage: 'Please upload a picture of the finished recipe!',
      }
    });

    return (
      <div className={ this.props.size } key={ this.props.id }>
        <div className="form-group">
          { this.props.label ? <label>{this.props.label}</label> : null }
          <input type="file"
                 name={ this.props.name }
                 accept={ this.props.accept }
                 onChange={ this.handleChange }/>
          <p className="help-block">{ formatMessage(messages.help_block) }</p>
        </div>
      </div>
    )
  }
}

export class Checkbox extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      checked: !!this.props.checked
    };
  }

  handleChange(event) {
    let checked = !this.state.checked;
    this.setState({
      checked: checked
    });

    if(this.props.change) {
      this.props.change(event.target.name, checked);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.checked !== nextProps.checked) {
      this.setState({
        checked: nextProps.checked
      });
    }
  }

  render() {
    return (
      <div className={ this.props.size } key={ this.props.id }>
        <label className={ this.props.label ? "checkbox-control" : "check-container" }>
          <input
              type="checkbox"
              name={ this.props.name }
              checked={ this.state.checked }
              onChange={ this.handleChange }
          />
          <span className="checkmark"/>
          { this.props.label ? <div className="checklabel">{ this.props.label }</div> : null }
        </label>
      </div>
    )
  }
}

export class SelectBase extends BaseComponent {
  render() {
    const options = this.props.data.map(function(option) {
      return (
        <option key={ option.id } value={ option.id }>{option.title}</option>
      );
    });

    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      header: {
        id: 'select_widget.header',
        description: 'Select widget default message',
        defaultMessage: 'Please select a {label}',
      }
    });

    return (
      <div className={ this.props.size } key={ this.props.id }>
        <div className={ "form-group " + (this.hasErrors() ? 'has-error' : null) }>
          { this.props.label ? <label>{ this.props.label }</label> : null }
          <select name={ this.props.name }
                  className="form-control"
                  value={ this.state.value }
                  onChange={ this.handleChange }>
            <option key={0} value="">{ formatMessage(messages.header, { label: this.props.label }) }</option>
            { options }
          </select>
          { this.getErrorMessage() }
        </div>
      </div>
    )
  }
}

export const File = injectIntl(FileBase);
export const Select = injectIntl(SelectBase);
