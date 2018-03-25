import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { IntlProvider, addLocaleData } from 'react-intl'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import history from './common/history'
import store from './common/store'
// import registerServiceWorker from './registerServiceWorker';

// Load components
import Header from './header/containers/Header'
import Demo from './base/components/Demo'
import Footer from './base/components/Footer'
import NotFound from './base/components/NotFound'
import Login from './account/containers/Login'
import News from './news/components/News'
import List from './list/containers/List'
import Browse from './browse/containers/Browse'
import Form from './recipe_form/containers/Form'
import RecipeView from './recipe/components/RecipeView'

// Load required polyfills
import {
  browserSupportsAllFeatures,
  loadPolyFills
} from './common/polyfill'

// Load default locale data;
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import de from 'react-intl/locale-data/de';
addLocaleData([...en, ...es, ...de]);
const messages = require('./locale/'+process.env.NODE_LOCALE+'.json');

// Load in the base CSS
require("../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss");
require("./base/css/core.scss");
require("./base/css/print.scss");

const main = (
  <IntlProvider locale={ process.env.NODE_LOCALE } messages={ messages }>
    <Provider store={ store }>
      <div>
        <div id="content">
          <Router history={ history }>
            <div>
              <Header />
              { process.env.NODE_ENV === 'demo' ? <Demo /> : '' }
              <Switch>
                <Route exact path='/' component={ News } />
                <Route path='/news' component={ News } />
                <Route path='/login' component={ Login } />
                <Route path='/browse' component={ Browse } />

                <Route path='/recipe/create' component={ Form } />
                <Route path='/recipe/edit/:recipe' component={ Form } />
                <Route path='/recipe/:recipe' component={ RecipeView } />

                <Route path='/list/:list' component={ List } />
                <Route path='/list' component={ List } />

                <Route path='/NotFound' component={ NotFound } />
                <Redirect path="*" to="/NotFound" />
              </Switch>
            </div>
          </Router>
        </div>
        <Footer />
      </div>
    </Provider>
  </IntlProvider>
);

const entryPoint = () => {
  render(main, document.getElementById('app'));
  // registerServiceWorker();
};

if (browserSupportsAllFeatures()) {
  // Browsers that support all features run `entryPoint()` immediately.
  entryPoint();
} else {
  // All other browsers loads polyfills and then run `entryPoint()`.
  loadPolyFills(entryPoint);
}
