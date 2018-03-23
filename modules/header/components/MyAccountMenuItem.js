import React from 'react'
import { injectIntl, defineMessages } from 'react-intl';
import { NavDropdown, MenuItem, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class AccountLoginMenuItemBase extends React.Component {
  render () {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      label: {
        id: 'nav.login.title',
        description: 'Login title',
        defaultMessage: 'Login',
      }
    });

    return (
      <LinkContainer to="/login">
        <MenuItem>{ formatMessage(messages.label) }</MenuItem>
      </LinkContainer>
    )
  }
}

class AccountMenuMenuItemBase extends React.Component {
  render () {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      title: {
        id: 'nav.accountmenu.title',
        description: 'Account menu title',
        defaultMessage: 'My Account',
      },
      logout: {
        id: 'nav.accountmenu.logout',
        description: 'Logout title',
        defaultMessage: 'Logout',
      },
      admin: {
        id: 'nav.accountmenu.admin',
        description: 'My Account',
        defaultMessage: 'My Account',
      }
    });

    return (
      <NavDropdown eventKey={1}
                   title={ formatMessage(messages.title) }
                   id="basic-nav-dropdown">
        <MenuItem href="/admin/">{formatMessage(messages.admin)}</MenuItem>
        <MenuItem divider />
        <NavItem onClick={ this.props.authActions.logUserOut }>
          { formatMessage(messages.logout) }
        </NavItem>
      </NavDropdown>
    )
  }
}

export const AccountMenuMenuItem = injectIntl(AccountMenuMenuItemBase);
export const AccountLoginMenuItem = injectIntl(AccountLoginMenuItemBase);
