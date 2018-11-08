import React from 'react'
import PropTypes from 'prop-types'

const Directions = ({ data }) => {
  let directions = [];
  let directionsGroups = [];
  // eslint-disable-next-line
  data.split("\n").map((direction, i) => {
    if (direction.length > 0) {
      if (direction.endsWith(":")) {
        directionsGroups.push(
          <div key={i}>
            <ol className="directions">
              {directions}
            </ol>
            <b>{direction.substring(0, direction.length - 1)}</b>
          </div>
        );
        directions = [];
      } else {
        directions.push(
          <li className="direction" key={i}>
            {direction}
          </li>
        );
      }
    }
  });

  directionsGroups.push(
    <ol className="directions" key='last'>
      {directions}
    </ol>
  );

  return (
    <div>
      { directionsGroups }
    </div>
  );
};

Directions.PropTypes = {
  data: PropTypes.string.isRequired
};

export default Directions;
