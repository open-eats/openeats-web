import React from 'react'
import PropTypes from 'prop-types'

import RatingComments from './RatingComments'
import NewRating from './NewRating'

require("./../css/recipe-rating-wrapper.scss");

const RatingWrapper = ({ recipeSlug, user, data, ratingActions }) => (
  <div className="panel rating-panel">
    <div className="panel-heading">
      <h3>Comments</h3>
    </div>
    <div className="panel-body">
      <RatingComments data={ data } userId={ user.id } {...ratingActions} />
    </div>
    { user.id > 0 ?
      <div className="panel-footer">
        <NewRating recipeSlug={recipeSlug} userId={ user.id } ratingActions={ratingActions}/>
      </div>
    : null }
  </div>
);

RatingWrapper.propTypes = {
  data: PropTypes.array.isRequired,
  recipeSlug: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  ratingActions: PropTypes.object.isRequired
};

export default RatingWrapper;
