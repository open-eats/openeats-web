import React from 'react'
import PropTypes from 'prop-types'

const IngredientQuantity = ({ numerator, denominator, servings, customServings }) => {
  if (denominator > 1) {
    const whole = numerator / denominator;
    const fraction = numerator % denominator;
    if (fraction > 0) {
      return (<p>{ whole } { fraction }/{ denominator }</p>)
    }
    return (<p>{ whole }</p>)
  } else if (numerator > 0) {
    return (<p>{ numerator }</p>);
  }

  return (<p/>);
};

IngredientQuantity.PropTypes = {
  numerator: PropTypes.number.isRequired,
  denominator: PropTypes.number.isRequired,
  servings: PropTypes.number.isRequired,
  customServings: PropTypes.number.isRequired,
};

export default IngredientQuantity;
