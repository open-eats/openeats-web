import React from 'react'
import { injectIntl, defineMessages} from 'react-intl';
import { MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class MenuMenuItemBase extends React.Component {
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

export const MenuMenuItem = injectIntl(MenuMenuItemBase);
