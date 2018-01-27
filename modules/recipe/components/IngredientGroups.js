import React from 'react'
import PropTypes from 'prop-types'

import Ingredients from './Ingredients'

const IngredientGroups = ({ data, check }) => {
  let ingredientGroups = data.map((group, i) => (
    <div className="ingredient-group" key={ i }>
      { (group.title) ? <b>{ group.title }</b> : null }
      <Ingredients data={ group.ingredients } check={ check }/>
    </div>
  ));

  return (
    <div className="ingredient-groups">
      { ingredientGroups }
    </div>
  );
};

IngredientGroups.PropTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.object.isRequired,
  }).isRequired).isRequired
};

export default IngredientGroups;
