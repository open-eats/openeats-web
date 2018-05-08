import React from 'react'
import PropTypes from 'prop-types'

const Directions = ({ data }) => {
  const directions = data.split("\n").reduce((filtered, direction, i) => {
    if (direction.length > 0) {
       filtered.push(
         <li className="direction" key={ i }>
           { direction }
         </li>
       );
    }
    return filtered;
  }, []);

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
