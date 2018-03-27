import React from 'react'
import { injectIntl, defineMessages } from 'react-intl';
import { MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class CreateRecipeMenuItemBase extends React.Component {
  render () {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      create_recipe: {
        id: 'nav.create_recipe',
        description: 'Create recipe title',
        defaultMessage: 'Create recipe',
      },
    });

    return (
      <LinkContainer to="/recipe/create">
        <MenuItem>{ formatMessage(messages.create_recipe) }</MenuItem>
      </LinkContainer>
    )
  }
}

export const CreateRecipeMenuItem = injectIntl(CreateRecipeMenuItemBase);
