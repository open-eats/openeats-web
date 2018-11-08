import React from 'react'
import PropTypes from 'prop-types'

import Ratings from './Ratings'

const RatingComments = ({ data, remove }) => {
  let ratings = data.map(rating=> {
    return (
      <div key={rating.id}>
        <hr/>
        <div onClick={() => remove(rating.id, rating.recipe)}>x</div>
        <Ratings stars={ rating.rating || 0 }/>
        { rating.comment || '' }
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
