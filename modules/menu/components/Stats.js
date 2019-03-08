import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'

const RecipeEvent = ({ stats }) => (
  <table className="table table-hover">
    <thead>
      <tr>
        <th>Recipe</th>
        <th>Count</th>
        <th>Last Made</th>
      </tr>
    </thead>
    <tbody>
      {stats.map(row => (
        <tr key={row.slug}>
          <th><Link to={'/recipe/' + row.slug}>{row.title}</Link></th>
          <th>{row.num_menuitems}</th>
          <th>{moment(row.last_made).format('ddd, MMMM D, YYYY')}</th>
        </tr>
      ))}
    </tbody>
  </table>
);

RecipeEvent.propTypes = {
  stats: PropTypes.array.isRequired,
};

export default RecipeEvent