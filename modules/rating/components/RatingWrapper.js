import React from 'react'
import PropTypes from 'prop-types'

import RatingComments from './RatingComments'
import NewRating from './NewRating'

require("./../css/recipe-rating-wrapper.scss");

const RatingWrapper = ({ recipeId, data, ratingActions }) => (
  <div className="panel rating-panel">
    <div className="panel-heading">
      <h3>Comments</h3>
    </div>
    <div className="panel-body">
      <RatingComments data={ data } {...ratingActions} />
    </div>
    <div className="panel-footer">
      <NewRating recipeId={ recipeId } ratingActions={ ratingActions }/>
    </div>
  </div>
);

RatingWrapper.propTypes = {
  data: PropTypes.array.isRequired,
  ratingActions: PropTypes.object.isRequired
};

export default RatingWrapper;
