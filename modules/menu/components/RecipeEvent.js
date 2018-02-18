import React from 'react'
import { Link } from 'react-router-dom'

const RecipeEvent = ({ event, title, isAllDay }) => (
  <div className="calender-recipe-event">
    <Link to={ '/recipe/' + event.recipe }>
      { event.recipe_title  }
    </Link>
    <span className="glyphicon glyphicon-pencil pull-right"/>
  </div>
);

export default RecipeEvent