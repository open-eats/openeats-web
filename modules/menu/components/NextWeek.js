import React from 'react'
import PropTypes from 'prop-types'
import ListRecipes from '../../browse/components/ListRecipes'

const NextWeek = ({ menuItems }) => (
  <ListRecipes
    format="col-xs-12 col-sm-6 col-md-3"
    data={menuItems.map(x => x.recipe_data)}
  />
);

NextWeek.propTypes = {
  menuItems: PropTypes.object.isRequired,
};

export default NextWeek