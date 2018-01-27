import React from 'react'
import {
    injectIntl,
    defineMessages,
} from 'react-intl'

import IngredientGroups from './IngredientGroups'
import SubRecipes from './SubRecipes'
import Directions from './Directions'
import RecipeHeader from './RecipeHeader'
import RecipeFooter from './RecipeFooter'
import IngredientButtons from './IngredientButtons'
import InfoPanel from './InfoPanel'

require("./../css/recipe.scss");

class RecipeScheme extends React.Component {
  render() {
    const { formatMessage } = this.props.intl;
    const messages = defineMessages({
      ingredients: {
        id: 'recipe.ingredients',
        description: 'Ingredients',
        defaultMessage: 'Ingredients',
      },
      directions: {
        id: 'recipe.directions',
        description: 'Directions',
        defaultMessage: 'Directions',
      },
    });

    return (
      <div className="recipe-details">
        <div className="panel panel-success">
          <RecipeHeader
            photo={ this.props.photo }
            rating={ this.props.rating }
            title={ this.props.title }
          />
          <div className="recipe-schema" itemType="http://schema.org/Recipe">
            <div className="row">
              <div className="mobile-image">
                <img className="img-responsive print-hidden" src={ this.props.photo } />
              </div>
              <div className="col-sm-7 col-sm-push-5 col-xs-12">
                <p className="print-only print-image">
                  <img className="img-responsive" src={ this.props.photo_thumbnail } />
                </p>
                <InfoPanel
                  cookTime={ this.props.cook_time }
                  prepTime={ this.props.prep_time }
                  servings={ this.props.servings }
                  customServings={ this.props.customServings }
                  info={ this.props.info }
                  updateServings={ this.props.recipeActions.updateServings }
                  clearServings={ this.props.recipeActions.resetServings }
                />
              </div>
              <div className="col-sm-5 col-sm-pull-7 col-xs-12">
                <h4>{ formatMessage(messages.ingredients) }</h4>
                <SubRecipes
                  data={ this.props.subrecipes }
                  check={ this.props.recipeActions.checkSubRecipe }
                />
                <IngredientGroups
                  data={ this.props.ingredient_groups }
                  check={ this.props.recipeActions.checkIngredient }
                />
                <IngredientButtons
                  listStatus={ this.props.listStatus }
                  lists={ this.props.lists }
                  bulkAdd={ this.props.recipeItemActions.bulkAdd.bind(this, this.props) }
                  checkAll={ this.props.recipeActions.checkAll }
                  unCheckAll={ this.props.recipeActions.unCheckAll }
                />
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-xs-12">
                <h4>{ formatMessage(messages.directions) }</h4>
                <Directions data={ this.props.directions }/>
              </div>
            </div>
          </div>
          <RecipeFooter
            id={ this.props.id }
            source={ this.props.source }
            username={ this.props.username }
            updateDate={ this.props.update_date }
            deleteRecipe={ this.props.recipeActions.deleteRecipe }
            showEditLink={ this.props.showEditLink }
          />
        </div>
      </div>
    );
  }
}

export default injectIntl(RecipeScheme);
