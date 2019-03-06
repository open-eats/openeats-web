import React from 'react'
import PropTypes from 'prop-types'
import ListRecipes from '../../browse/components/ListRecipes'

const OnTheMenu = ({ menuItems }) => (
  <ListRecipes
    format="col-xs-12 col-sm-6 col-md-3"
    data={menuItems.map(x => x.recipe_data)}
    footer={(recipe) => (
      <div className="row recipe-card-news-footer">
        <div className="col-xs-6">
          <button className="btn btn-success complete-btn" >
              Complete <span className="glyphicon glyphicon-ok" aria-hidden="true"/>
          </button>
        </div>
        <div className="col-xs-6">
          <button className="btn btn-warning complete-btn" >
              Edit <span className="glyphicon glyphicon-pencil" aria-hidden="true"/>
          </button>
        </div>
      </div>
    )}
  />
);

OnTheMenu.propTypes = {
  menuItems: PropTypes.array.isRequired,
};

export default OnTheMenu