import React from 'react'
import PropTypes from 'prop-types'

import Ratings from './Ratings'

const RatingComments = ({ data, userId, remove }) => {
  let ratings = data.map(rating=> {
    return (
      <div key={rating.id}  className="row">
        <div className="col-xs-12">
          <hr/>
        </div>
        <div className="col-xs-11">
          <Ratings stars={ rating.rating || 0 }/>
        </div>
        <div className="col-xs-1">
          {userId === rating.user_id ?
            <button
              className="btn btn-danger btn-sm"
              onClick={() => remove(rating.id, rating.recipe)}
            >
              <span className="glyphicon glyphicon-trash"/>
            </button>
          : null }
        </div>
        <div className="col-xs-12">
          <span
            dangerouslySetInnerHTML={{
              __html: rating.comment ? rating.comment.replace(new RegExp('\n', 'g'), '<br />') : ''
            }}
          />
        </div>
        <div className="col-xs-12">
        - {rating.username}
        </div>
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
