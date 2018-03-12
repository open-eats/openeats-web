import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import RatingWrapper from '../components/RatingWrapper'
import * as RatingsActions from "../actions/RatingsActions";

class Rating extends React.Component {
  render() {
    let { rating, recipeId, ratingActions } = this.props;
    return (
      <RatingWrapper
        recipeId={ recipeId }
        data={ rating.filter(r => r.recipeId === this.props.recipeId) }
        ratingActions={ ratingActions }
      />
    );
  }
}

Rating.propTypes = {
  rating: PropTypes.array.isRequired,
  recipeId: PropTypes.number.isRequired,
  ratingActions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  rating: state.rating.ratings,
});

const mapDispatchToProps = dispatch => ({
  ratingActions: bindActionCreators(RatingsActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rating);
