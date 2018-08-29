import React from 'react'
import SelectReact from 'react-select'
import { Async as AsyncReact} from 'react-select'
import { BaseComponent } from './FormComponents'

require('react-select/dist/react-select.css');
require('../css/select.scss');

export class Async extends BaseComponent {
  handleChange(data) {
    this.setState({
      value: data
    });

    if(this.props.change) {
      this.props.change(this.props.name, data ? data.value : '');
      this.props.change(this.props.title, data ? data.label : '');
    }
  }

  render() {
    return (
      <div className={ this.props.class } key={ this.props.id }>
        <div className={ "form-group " + (this.hasErrors() ? 'has-error' : null) }>
          { this.props.label ? <label>{ this.props.label }</label> : null }
          <AsyncReact
            name={ this.props.name }
            value={ this.props.value }
            onChange={ this.handleChange }
            loadOptions={ this.props.loadOptions }
          />
          { this.getErrorMessage() }
        </div>
      </div>
    )
  }
}

export class Select extends BaseComponent {
  handleChange(data) {
    this.setState({
      value: data
    });

    if(this.props.change) {
      this.props.change(this.props.name, data.value);
    }
  }

  render() {
    return (
      <div className={ this.props.class } key={ this.props.id }>
        <div className={ "form-group " + (this.hasErrors() ? 'has-error' : null) }>
          { this.props.label ? <label>{ this.props.label }</label> : null }
          <SelectReact
            name={ this.props.name }
            value={ this.state.value }
            onChange={ this.handleChange }
            options={ this.props.data }
          />
          { this.getErrorMessage() }
        </div>
      </div>
    )
  }
}
