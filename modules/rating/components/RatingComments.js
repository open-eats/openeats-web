import React from 'react'
import PropTypes from 'prop-types'

import Ratings from './Ratings'

const RatingComments = ({ data }) => {
  let ratings = data.map((rating, i)=> {
    return (
      <div key={i}>
        <hr/>
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
  data: PropTypes.array.isRequired
};

export default RatingComments;
