import React from 'react'
import PropTypes from 'prop-types'
import Spinner from 'react-spinkit';
import { DropdownButton, MenuItem } from 'react-bootstrap'
import {
    injectIntl,
    defineMessages,
} from 'react-intl'

import RecipeListStatusConstants from '../constants/RecipeListStatusConstants'

const IngredientButtons = ({ lists, listStatus, bulkAdd, checkAll, unCheckAll, intl }) => {
  const messages = defineMessages({
    save: {
      id: 'recipe.recipe_ingredient_button.save',
      description: 'Save to list',
      defaultMessage: 'Add To'
    },
    check_all: {
      id: 'recipe.recipe_ingredient_button.check_all',
      description: 'Check All',
      defaultMessage: 'Check All'
    },
    clear: {
      id: 'recipe.recipe_ingredient_button.clear',
      description: 'Clear',
      defaultMessage: 'Clear'
    },
  });

  let listTitles = [];
  if (lists) {
    listTitles = lists.map(list => {
      return (
        <MenuItem
            key={ list.id }
            eventKey={ list.id }
            onClick={ bulkAdd.bind(this, list.id) }>
          { list.title }
        </MenuItem>
      )
    });
  }

  let checkmark = '';
  if (listStatus === RecipeListStatusConstants.LOADING) {
    checkmark = (
      <Spinner spinnerName="circle" className="recipe-list-spinner" noFadeIn />
    )
  } else if (listStatus === RecipeListStatusConstants.COMPLETE) {
    checkmark = (
      <div className="glyphicon glyphicon-ok"/>
    );
  } else if (listStatus === RecipeListStatusConstants.ERROR) {
    checkmark = (
      <div className="glyphicon glyphicon-remove"/>
    );
  }

  let dropdown = (
    <DropdownButton title={ intl.formatMessage(messages.save) } id="ing-save">
      { listTitles }
    </DropdownButton>
  );

  return (
    <div className="ingredients-save">
      <div className="btn-group" role="group">
        <button className="btn btn-default" onClick={ checkAll }>
          { intl.formatMessage(messages.check_all) }
        </button>
        <button className="btn btn-default" onClick={ unCheckAll }>
          { intl.formatMessage(messages.clear) }
        </button>
        { listTitles.length > 0 ? dropdown : null }
      </div>
      { checkmark }
    </div>
  );
};

IngredientButtons.PropTypes = {
  lists: PropTypes.object.isRequired,
  listStatus: PropTypes.string.isRequired,
  bulkAdd: PropTypes.func.isRequired,
  checkAll: PropTypes.func.isRequired,
  unCheckAll: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(IngredientButtons);
