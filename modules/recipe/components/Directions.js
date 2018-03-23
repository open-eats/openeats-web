import React from 'react'
import PropTypes from 'prop-types'

const Directions = ({ data }) => {
  // eslint-disable-next-line
  let directions = data.split("\n").filter((direction, i) => {
    if (direction.length > 0) {
      return (
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
