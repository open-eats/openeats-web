import React from 'react'
import PropTypes from 'prop-types'

import Ratings from './Ratings'

const RecipeHeader = ({ photo, title, rating }) => {
  if (photo) {
    return (
      <div className="panel-heading hero-image" style={{backgroundImage: "url(" + photo + ")"}}>
        <div className="row title">
          <div className="col-xs-12">
            <h3>{ title }</h3>
            <Ratings stars={ rating }/>
          </div>
        </div>
        <div className="row options print-hidden">
          <div className="col-xs-12">
            <button className="btn btn-primary btn-sm" onClick={ window.print }>
              <span className="glyphicon glyphicon-print" aria-hidden="true"/>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="panel-heading">
      <div className="row">
        <div className="col-xs-12">
          <h3>{ title }</h3>
          <Ratings stars={ rating }/>
        </div>
      </div>
    </div>
  );
};

RecipeHeader.PropTypes = {
  photo: PropTypes.object.isRequired,
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default RecipeHeader;
