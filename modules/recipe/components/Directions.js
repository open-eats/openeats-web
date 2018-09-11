import React from 'react'
import PropTypes from 'prop-types'

const Directions = ({ data }) => {
  let tmp = [];
  let filtered = [];
  const directions = data.split("\n").map((direction, i) => {
    if (direction.length > 0) {
      if (direction === '---') {
        filtered.push(
          <div>
            <ol className="directions">
              {tmp}
            </ol>
            <h5>direction</h5>
          </div>
        );
        tmp = [];
      } else {
        tmp.push(
          <li className="direction" key={i}>
            {direction}
          </li>
        );
      }
    }
  });
  filtered.push(
    <div>
      <ol className="directions" key='last'>
        {tmp}
      </ol>
    </div>
  );

  return (
    <div>
      { filtered }
    </div>
  );
};

Directions.PropTypes = {
  data: PropTypes.string.isRequired
};

export default Directions;
