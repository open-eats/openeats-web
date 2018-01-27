import React from 'react'
import {
  injectIntl,
  defineMessages,
} from 'react-intl';

import { TextArea } from '../../common/components/FormComponents'
import IngredientGroups from '../../recipe/components/IngredientGroups'
import TabbedView from './TabbedView'

class IngredientBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data || [],
      text: this.unarrayify(this.props.data || []),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id != this.props.id) {
      this.setState({
        data: nextProps.data || [],
        text: this.unarrayify(nextProps.data || []),
      });
    }
  }

  unarrayify = value => {
    let tr = '';
    if (value) {
      value.map(ig => {
        if (ig.title) {
          tr += ig.title + ':\n';
        }
        ig.ingredients.map(i => {
          tr += i.quantity ? i.quantity + " " : '';
          tr += i.measurement ? i.measurement + " " : '';
          tr += i.title + '\n'
        });
        tr += '\n';
      });
    }
    if (tr.length > 3) {
      return tr.substring(0, tr.length - 2);
    }
    return tr;
  };

  arrayify = value => {
    let dict = [{title: '', ingredients: []}];
    let igTitle = '';
    let ings = dict.find(t => t.title === '').ingredients;
    if (value) {
      let tags = value.split('\n').filter(t => t.trim().length > 1);
      for (let index in tags) {
        let line = tags[index].trim();
        if (line.length > 0) {
          // Check if the line is an IG title
          // If line is IG title, update igTitle and continue
          // Else add ing to the current ig group
          if (line.includes(':') && line.length > 1) {
            igTitle = line.substring(0, line.length - 1);
            dict.push({title: igTitle, ingredients: []});
            ings = dict.find(t => t.title === igTitle).ingredients;
          } else {
            let tags = line.split(' ');
            if (tags.length === 1) {
              ings.push({ title: line });
            } else if (tags.length === 2) {
              if (!(isNaN(tags[0]))) {
                ings.push({ quantity: tags[0], title: tags[1] })
              } else {
                ings.push({ title: line });
              }
            } else {
              if (!(isNaN(tags[0]))) {
                let quantity = tags.splice(0,1)[0];
                let measurement = tags.splice(0,1)[0];
                ings.push({
                  quantity: quantity,
                  measurement: measurement,
                  title: tags.join(' ')
                });
              } else {
                ings.push({ title: line });
              }
            }
          }
        }
      }
    }
    return dict
  };

  handleChange = (key, value) => {
    this.setState({
      data: this.arrayify(value),
      text: value
    });

    if(this.props.change) {
      this.props.change(key, this.arrayify(value));
    }
  };

  render() {
    const { formatMessage } = this.props.intl;
    const messages = defineMessages({
      info_title: {
        id: 'recipe.create.ing.info_title',
        description: 'info_title',
        defaultMessage: 'Ingredient Help',
      },
      info_desc: {
        id: 'recipe.create.ing.info_desc',
        description: 'info_desc',
        defaultMessage: 'Each Ingredient should be only its own line. Click the Preview to see what the Ingredients will look like.',
      },
    });

    const help = {
      infoTitle: formatMessage(messages.info_title),
      infoDesc: formatMessage(messages.info_desc)
    };

    return (
      <TabbedView  { ...{...this.props, ...help} }>
        <TextArea
          name={ this.props.name }
          rows="8"
          change={ this.handleChange }
          value={ this.state.text }
        />
        <div className="recipe-details">
          <div className="recipe-schema">
            <IngredientGroups data={ this.state.data }/>
          </div>
        </div>
      </TabbedView>
    )
  }
}

export default injectIntl(IngredientBox)
