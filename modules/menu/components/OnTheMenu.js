import React from 'react'
import PropTypes from 'prop-types'
import ListRecipes from '../../browse/components/ListRecipes'

const OnTheMenu = ({ menuItems, completeMenuItem, editMenuItem }) => (
  <ListRecipes
    format="col-xs-12 col-sm-6 col-md-4 col-lg-3"
    data={menuItems.map(x => {return {...x.recipe_data, menuItemId: x.id}})}
    footer={(recipe) => (
      <div className="row recipe-card-news-footer">
        <div className="col-xs-6">
          <button className="menu-complete-btn btn btn-success" title="Complete the Recipe" onClick={() => completeMenuItem(recipe.menuItemId)}>
            <span className="glyphicon glyphicon-ok" aria-hidden="true"/>
          </button>
        </div>
        <div className="col-xs-6">
          <button className="menu-edit-btn btn btn-warning" title="Edit the Menu Item" onClick={() => editMenuItem(recipe.menuItemId)}>
            <span className="glyphicon glyphicon-pencil" aria-hidden="true"/>
          </button>
        </div>
      </div>
    )}
  />
);

OnTheMenu.propTypes = {
  menuItems: PropTypes.array.isRequired,
  completeMenuItem: PropTypes.func.isRequired,
  editMenuItem: PropTypes.func.isRequired,
};

export default OnTheMenu
