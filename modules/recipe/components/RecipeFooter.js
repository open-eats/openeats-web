import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
    injectIntl,
    defineMessages,
} from 'react-intl'

const RecipeFooter = ({ id, source, username, updateDate, showEditLink, deleteRecipe, intl }) => {
  const messages = defineMessages({
    source: {
      id: 'recipe.source',
      description: 'Source of the recipe',
      defaultMessage: 'Source'
    },
    created_by: {
      id: 'recipe.created_by',
      description: 'Created by',
      defaultMessage: 'Created by'
    },
    last_updated: {
      id: 'recipe.last_updated',
      description: 'Last Updated',
      defaultMessage: 'Last Updated'
    },
    confirm_delete: {
      id: 'recipe.confirm_delete',
      description: 'Are you sure you want to delete this recipe?',
      defaultMessage: 'Are you sure you want to delete this recipe?'
    },
  });

  let hostname = '';
  if (source) {
    // Get Host name of a URL
    let a = document.createElement('a');
    a.href = source;
    hostname = a.hostname;
  }

  const handleDelete = () => {
    if (confirm(intl.formatMessage(messages.confirm_delete))) {
      deleteRecipe(id)
    }
  };

  const sourceLink = (
    <div>
      { intl.formatMessage(messages.source) }:
      <a href={ source }>{ hostname }</a>
    </div>
  );

  const editLink = (
    <Link to={ "/recipe/edit/" + id }>
      <button className="btn btn-primary btn-sm">
        <span className="glyphicon glyphicon-pencil"/>
      </button>
    </Link>
  );

  const deleteLink = (
    <button className="btn btn-danger btn-sm" onClick={ handleDelete }>
      <span className="glyphicon glyphicon-trash"/>
    </button>
  );
  
  return (
    <div className="panel-footer">
      <div className="row">
        <div className="col-xs-6">
          { (source) ? sourceLink : null }
          <div>{ intl.formatMessage(messages.created_by) }: { username }</div>
          <div>{ intl.formatMessage(messages.last_updated) }: { updateDate }</div>
        </div>
        <div className="col-xs-6 pull-right text-right">
          { showEditLink ? editLink : null }
          { showEditLink ? deleteLink : null }
        </div>
      </div>
    </div>
  );
};

RecipeFooter.PropTypes = {
  id: PropTypes.number.isRequired,
  source: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  updateDate: PropTypes.instanceOf(Date).isRequired,
  showEditLink: PropTypes.bool.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(RecipeFooter);
