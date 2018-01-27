import React from 'react'
import { Link } from 'react-router-dom'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';
import { Image, Navbar, Nav, NavDropdown, MenuItem, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { CreateRecipeMenuItem } from './CreateRecipeMenuItem'
import { GroceryListMenuItem } from './GroceryListMenuItem'
import { AccountMenuMenuItem, AccountLoginMenuItem } from './MyAccountMenuItem'

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
    }
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.props.listActions.load();
    }
  }

  componentWillReceiveProps(nextProps) {
    // We need to check if the state is being changed from `false` to `true`.
    // If it is we need to init the list store so the menu has teh users lists.
    if (this.hasOwnProperty('state')) {
      if (!this.state.authenticated && !!nextProps.user.id) {
        this.props.listActions.load();
        this.setState({ authenticated: true})
      }
    }
  };

  render() {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      brand: {
        id: 'nav.brand',
        description: 'Open Eats title',
        defaultMessage: 'Open Eats',
      },
      news: {
        id: 'nav.news',
        description: 'Navbar News',
        defaultMessage: 'News',
      },
      recipes: {
        id: 'nav.recipes',
        description: 'Navbar Recipes',
        defaultMessage: 'Browse Recipes',
      },
      randomRecipe: {
        id: 'nav.randomRecipe',
        description: 'Random Recipe',
        defaultMessage: 'Random Recipe',
      },
    });

    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
              <Image alt="Brand" src="/images/chef.png" responsive={ true } />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/news">
              <NavItem>{formatMessage(messages.news)}</NavItem>
            </LinkContainer>
            <LinkContainer to="/browse">
              <NavItem>{formatMessage(messages.recipes)}</NavItem>
            </LinkContainer>
            <NavItem onClick={ this.props.randomRecipeActions.randomRecipe }>
              {formatMessage(messages.randomRecipe)}
            </NavItem>
            {( this.props.user.id  ?
                <CreateRecipeMenuItem/> : null
            )}
            {( this.props.user.id ?
                <GroceryListMenuItem data={ this.props.lists }/> : null
            )}
          </Nav>
          <Nav pullRight>
            {( this.props.user.id  ?
                <AccountMenuMenuItem authActions={ this.props.authActions }/> :
                <AccountLoginMenuItem/>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

module.exports = injectIntl(NavBar);
