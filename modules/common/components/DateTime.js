import React from 'react'
import Datetime from 'react-datetime'
import moment from 'moment'
import { BaseComponent } from './FormComponents'

require('react-datetime/css/react-datetime.css');

export class DateTime extends BaseComponent {
  handleChange(date) {
    this.setState({
      value: date
    });

    if(this.props.change) {
      this.props.change(this.props.name, moment(date).toISOString());
    }
  }

  render() {
    return (
      <div className={ this.props.class } key={ this.props.id }>
        <div className={ "form-group " + (this.hasErrors() ? 'has-error' : null) }>
          { this.props.label ? <label>{this.props.label}</label> : null }
          <Datetime
            inputProps={{ name: this.props.name, className: 'form-control' }}
            onChange={ this.handleChange }
            value={ !this.props.timeFormat ? moment(this.state.value).format('ddd, ll') : moment(this.state.value).format('llll') }
            dateFormat={ this.props.dateFormat || 'ddd, ll' }
            timeFormat={ this.props.timeFormat }
          />
        { this.getErrorMessage() }
        </div>
      </div>
    )
  }
}
