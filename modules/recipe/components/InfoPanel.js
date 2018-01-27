import React from 'react'
import PropTypes from 'prop-types'
import {
    injectIntl,
    defineMessages,
} from 'react-intl'

import { Input } from '../../common/components/FormComponents'

const RecipeHeader = ({ cookTime, prepTime, servings, customServings, info, updateServings, clearServings, intl }) => {
  const messages = defineMessages({
    servings: {
      id: 'recipe.servings',
      description: 'Servings',
      defaultMessage: 'Servings',
    },
    prep_time: {
      id: 'recipe.prep_time',
      description: 'Preparation time',
      defaultMessage: 'Prep time',
    },
    cooking_time: {
      id: 'recipe.cooking_time',
      description: 'Cooking time',
      defaultMessage: 'Cooking time',
    },
    minutes: {
      id: 'recipe.minutes',
      description: 'minutes',
      defaultMessage: 'minutes'
    },
  });

  let clearInput = '';
  if (servings != customServings && !!customServings) {
    clearInput = (
      <span className="input-group-btn">
        <button className="btn btn-default" type="button" onClick={ clearServings }>
          <span className="glyphicon glyphicon-remove" aria-hidden="true"/>
        </button>
      </span>
    )
  }

  return (
    <div className="panel panel-default">
      <table className="table table-bordered">
        <thead>
          <tr className="active">
            <th>{ intl.formatMessage(messages.servings) }</th>
            <th>{ intl.formatMessage(messages.prep_time) }</th>
            <th>{ intl.formatMessage(messages.cooking_time) }</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="input-group print-hidden">
                <Input
                  name="servings"
                  type="number"
                  size="servings-textbox"
                  change={ updateServings }
                  value={ customServings ? customServings : servings } />
                { clearInput }
              </div>
              <p className="print-only">{ customServings ? customServings : servings }</p>
            </td>
            <td>{ prepTime } { intl.formatMessage(messages.minutes) }</td>
            <td>{ cookTime } { intl.formatMessage(messages.minutes) }</td>
          </tr>
        </tbody>
      </table>
      <div className="panel-body">
        <p>{ info }</p>
      </div>
    </div>
  );
};

RecipeHeader.PropTypes = {
  cookTime: PropTypes.number.isRequired,
  prepTime: PropTypes.number.isRequired,
  servings: PropTypes.number.isRequired,
  customServings: PropTypes.string,
  info: PropTypes.string.isRequired,
  updateServings: PropTypes.func.isRequired,
  clearServings: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(RecipeHeader);
