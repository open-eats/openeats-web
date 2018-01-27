import React from 'react'
import PropTypes from 'prop-types'

import Recipe from '../containers/Recipe'
import MiniBrowse from '../../browse/containers/MiniBrowse'

const RecipeView = ({ match }) => (
  <div className="container">
    <div className="row">
      <div className="col-md-9">
        <Recipe match={ match } />
      </div>
      <div className="col-md-3">
        <MiniBrowse format="col-md-12 col-sm-6 col-xs-12" qs="?limit=4" />
      </div>
    </div>
  </div>
);

RecipeView.PropTypes = {
  match: PropTypes.object.isRequired
};

export default RecipeView;
