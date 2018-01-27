import React from 'react'
import PropTypes from 'prop-types'

const Directions = ({ data }) => {
  let directions = [];
  data.split("\n").map((direction, i) => {
    if (direction.length > 0) {
      directions.push(
        <li className="direction" key={ i }>
          { direction }
        </li>
      );
    }
  });

  return (
    <ol className="directions" >
      { directions }
    </ol>
  );
};

Directions.PropTypes = {
  data: PropTypes.string.isRequired
};

export default Directions;
