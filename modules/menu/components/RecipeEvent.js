import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const RecipeEvent = ({ event, title, isAllDay }) => (
  <div className="calender-recipe-event">
    <Link to={ '/recipe/' + event.recipe_slug }>
      { event.recipe_title  }
    </Link>
    <span className="glyphicon glyphicon-pencil pull-right"/>
  </div>
);

RecipeEvent.propTypes = {
  event: PropTypes.object.isRequired,
  title: PropTypes.string,
  isAllDay: PropTypes.bool,
};

export default RecipeEvent