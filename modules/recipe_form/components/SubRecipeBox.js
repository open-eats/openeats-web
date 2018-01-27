import React from 'react'
import {
  injectIntl,
  defineMessages,
} from 'react-intl';
import ReactTextareaAutocomplete from "@webscopeio/react-textarea-autocomplete";

import SubRecipes from '../../recipe/components/SubRecipes'
import TabbedView from './TabbedView'

require('../css/smart-text-box.scss');

class SubRecipeBox extends React.Component {
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
      value.map(i => {
        tr += i.quantity ? i.quantity + " " : '';
        tr += i.measurement ? i.measurement + " " : '';
        tr += i.title + '\n'
      });
    }
    return tr.substring(0, tr.length - 1);
  };

  arrayify = value => {
    let ings = [];
    let subRecipes = value.split('\n').filter(t => t.trim().length > 1);
    for (let index in subRecipes) {
      let line = subRecipes[index];
      if (line.length > 0) {
        let subRecipes = line.split(' ');
        if (subRecipes.length === 1) {
          ings.push({ title: line });
        } else if (subRecipes.length === 2) {
          if (!(isNaN(subRecipes[0]))) {
            ings.push({ quantity: subRecipes[0], title: subRecipes[1] })
          } else {
            ings.push({ title: line });
          }
        } else {
          if (!(isNaN(subRecipes[0]))) {
            let quantity = subRecipes.splice(0, 1)[0];
            let measurement = subRecipes.splice(0, 1)[0];
            ings.push({
              quantity: quantity,
              measurement: measurement,
              title: subRecipes.join(' ')
            });
          } else {
            ings.push({ title: line });
          }
        }
      }
    }
    return ings
  };

  handleChange = event => {
    let value = event.target.value;

    this.setState({
      data: this.arrayify(value),
      text: value
    });

    if(this.props.change) {
      this.props.change(this.props.name, this.arrayify(value));
    }
  };

  render() {
    const { formatMessage } = this.props.intl;
    const messages = defineMessages({
      info_title: {
        id: 'recipe.create.rf.info_title',
        description: 'info_title',
        defaultMessage: 'Ingredient Help',
      },
      info_desc: {
        id: 'recipe.create.rf.info_desc',
        description: 'info_desc',
        defaultMessage: 'Each Recipe Link should be only its own line. Click the Preview to see what the Recipe Links will look like.',
      },
    });

    const help = {
      infoTitle: formatMessage(messages.info_title),
      infoDesc: formatMessage(messages.info_desc)
    };

    const Item = ({ entity: { name } }) => <div>{`${name}`}</div>;
    const Loading = ({ data }) => <div className="loading">Loading...</div>;

    return (
      <TabbedView { ...{...this.props, ...help} }>
        <div className="form-group">
          <ReactTextareaAutocomplete
            className="form-control"
            loadingComponent={ Loading }
            value={ this.state.text }
            onChange={ this.handleChange }
            rows="4"
            trigger={{
              ":": {
                dataProvider: token => {
                  return this.props.fetchRecipeList(token);
                },
                component: Item,
                output: (item, trigger) => item.char
              }
            }}
          />
        </div>
        <div className="recipe-details">
          <div className="recipe-schema">
            <SubRecipes data={ this.state.data }/>
          </div>
        </div>
      </TabbedView>
    );
  }
}

export default injectIntl(SubRecipeBox)
