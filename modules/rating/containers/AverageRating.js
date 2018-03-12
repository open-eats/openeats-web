import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Ratings from '../components/Ratings'

class AverageRating extends React.Component {
  render() {
    let rating = this.props.rating.filter(r => r.recipeId === this.props.recipeId);
    let stars = 0;
    if (rating.length > 0) {
       rating.map((r) => stars += r.rating);
      stars = parseInt(stars/rating.length);
    }
    return ( <Ratings stars={ stars }/> );
  }
}

AverageRating.propTypes = {
  recipeId: PropTypes.number.isRequired,
  rating: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  rating: state.rating.ratings,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AverageRating);
