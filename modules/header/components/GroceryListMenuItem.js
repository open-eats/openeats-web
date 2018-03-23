import React from 'react'
import { injectIntl, defineMessages } from 'react-intl';
import { NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class GroceryListMenuItemBase extends React.Component {
  render () {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      grocery_list: {
        id: 'nav.grocery_list',
        description: 'Grocery List',
        defaultMessage: 'Grocery List',
      },
    });

    let lists = this.props.data.map((list) => {
      return (
        <LinkContainer to={"/list/" + list.slug} key={ list.id }>
          <MenuItem>{ list.title }</MenuItem>
        </LinkContainer>
      )
    });

    return (
      <NavDropdown eventKey="list"
                   title={ formatMessage(messages.grocery_list) }
                   id="basic-nav-dropdown">
        { lists }
        {( this.props.data.length > 0 ? <MenuItem divider /> : null )}
        <LinkContainer exact={ true } to="/list">
          <MenuItem>{ formatMessage(messages.grocery_list) }</MenuItem>
        </LinkContainer>
      </NavDropdown>

    )
  }
}

export const GroceryListMenuItem = injectIntl(GroceryListMenuItemBase);
