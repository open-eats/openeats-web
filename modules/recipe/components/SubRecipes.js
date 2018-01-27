import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Checkbox } from '../../common/components/FormComponents'

const SubRecipes = ({ data, check }) => {
  let subRecipes = data.map((subRecipe, i) => {
    let quantity = subRecipe.customQuantity ? subRecipe.customQuantity : subRecipe.quantity;
    return (
      <li className="ingredient" key={ i }>
        <Checkbox
          name={ subRecipe.child_recipe_id }
          checked={ subRecipe.checked ? subRecipe.checked : false }
          change={ check }
        />
        { (subRecipe.quantity !== 0)
            ? <span className="quantity">{ quantity } </span>
            : null
        }
        { (subRecipe.measurement)
            ? <span className="measurement">{ subRecipe.measurement } </span>
            : null
        }
        { (subRecipe.title)
            ? <Link to={ "/recipe/" + subRecipe.child_recipe_id } className="title">{ subRecipe.title }</Link>
            : null
        }
      </li>
    );
  });

  return (
    <ul className="ingredients" >
      { subRecipes }
    </ul>
  );
};

SubRecipes.PropTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    child_recipe_id: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    measurement: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired).isRequired
};

export default SubRecipes;
