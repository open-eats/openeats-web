import React from 'react'
import PropTypes from 'prop-types'

import Ratings from './Ratings'

const RatingComments = ({ data, remove }) => {
  let ratings = data.map(rating=> {
    return (
      <div key={rating.id}>
        <hr/>
        <button
          className="btn btn-danger btn-sm"
          onClick={ () => remove(rating.id, rating.recipe) }
        >
          <span className="glyphicon glyphicon-trash"/>
        </button>
        <Ratings stars={ rating.rating || 0 }/>
        { rating.comment || '' }
        <br/>
        by: {rating.username}
      </div>
    )
  });

  return (
    <div className="my-rating-list">
      { ratings }
    </div>
  );
};

RatingComments.propTypes = {
  data: PropTypes.array.isRequired,
  remove: PropTypes.func.isRequired,
};

export default RatingComments;
