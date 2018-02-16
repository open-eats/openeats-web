import React from 'react'
import Datetime from 'react-datetime'
import { BaseComponent } from './FormComponents'

require('react-datetime/css/react-datetime.css');

export class DateTime extends BaseComponent {
  constructor(props) {
    super(props);
  }

  handleChange(date) {
    this.setState({
      value: date
    });

    if(this.props.change) {
      this.props.change(this.props.name, date);
    }
  }

  render() {
    return (
      <div className={ this.props.size } key={ this.props.id }>
        <div className={ "form-group " + (this.hasErrors() ? 'has-error' : null) }>
          { this.props.label ? <label>{this.props.label}</label> : null }
          <Datetime
            inputProps={{ name: this.props.name, className: 'form-control' }}
            onChange={ this.handleChange }
            value={ this.props.value }
          />
        { this.getErrorMessage() }
        </div>
      </div>
    )
  }
}
