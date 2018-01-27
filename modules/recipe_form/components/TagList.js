import React from 'react'

import { Input } from '../../common/components/FormComponents'

class TagList extends React.Component {
  unarrayify = value => {
    return value.map((tag, key) => {
      return tag.title
    }).join(', ');
  };

  arrayify = value => {
    let dict = [];
    if (value) {
      let tags = value.split(',');
      for (let title in tags) {
        dict.push({'title': tags[title].trim()})
      }
    }
    return dict
  };

  handleChange = (name, value) => {
    if(this.props.change) {
      this.props.change(name, this.arrayify(value));
    }
  };

  render() {
    return (
      <Input
        name={ this.props.name }
        label={ this.props.label }
        placeholder={ this.props.placeholder }
        size={ this.props.size }
        change={ this.handleChange }
        value={ this.props.tags ? this.unarrayify(this.props.tags) : '' }
        errors={ this.props.errors }
      />
    )
  }
}

export default TagList
