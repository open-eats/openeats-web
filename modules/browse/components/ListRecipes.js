import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import Ratings from '../../recipe/components/Ratings';

require("./../css/list-recipes.scss");

const ListRecipes = ({ data, format }) => {
  const getRecipeImage = (recipe) => {
    if (recipe.photo_thumbnail) {
      return recipe.photo_thumbnail;
    } else {
      const images = ['fish', 'fried-eggs', 'pizza', 'soup', 'steak'];
      return '/images/' + images[Math.floor(Math.random(0) * images.length)] + '.png';
    }
  };

  const recipes = data.map((recipe) => {
    const link = '/recipe/' + recipe.id;
    return (
      <div className={ format } key={ recipe.id }>
        <div className="thumbnail recipe">
          <div className="row">
            <Link to={ link } className="col-sm-12 col-xs-6">
              <img src={ getRecipeImage(recipe) } alt={ recipe.title }/>
            </Link>
            <div className="col-sm-12 col-xs-6">
              <div className="caption">
                <h4><Link to={ link }>{ recipe.title }</Link></h4>
                <p className="desc">{ recipe.info }</p>
                <div className="visible-xs">
                  <Ratings stars={ recipe.rating }/>
                  <p className="date">{ recipe.pub_date }</p>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-xs-12 hidden-xs">
              <div className="ratings">
                <p className="pull-right date">{ recipe.pub_date }</p>
                <Ratings stars={ recipe.rating }/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="recipes">
      { recipes }
    </div>
  );
};

ListRecipes.propTypes = {
  format: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired
};

export default ListRecipes;
