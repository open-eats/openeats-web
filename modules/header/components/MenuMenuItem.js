import React from 'react'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';
import { MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class MenuMenuItem extends React.Component {
  render () {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      menu: {
        id: 'nav.menu',
        description: 'menus',
        defaultMessage: 'Menu',
      },
    });

    return (
      <LinkContainer to="/menu/">
        <MenuItem>{ formatMessage(messages.menu) }</MenuItem>
      </LinkContainer>
    )
  }
}

module.exports.MenuMenuItem = injectIntl(MenuMenuItem);
