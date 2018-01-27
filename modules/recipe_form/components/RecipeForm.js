import React from 'react'
import {
  injectIntl,
  defineMessages,
} from 'react-intl';

import {
  Input,
  File,
  Select,
  TextArea,
  Checkbox,
} from '../../common/components/FormComponents'

import IngredientBox from './IngredientBox'
import DirectionBox from './DirectionBox'
import SubRecipeBox from './SubRecipeBox'
import TagList from './TagList'
import Status from './Status'

require("./../css/recipe_form.scss");

class RecipeForm extends React.Component {
  getRecipeImage = (photo_thumbnail) => {
    if (photo_thumbnail) {
      return photo_thumbnail;
    } else {
      return '/images/fried-eggs.png';
    }
  };

  save = e => {
    e.preventDefault();
    this.props.recipeFormActions.save(this.props.form);
  };

  submit = e => {
    e.preventDefault();
    this.props.recipeFormActions.submit(this.props.form);
  };

  render() {
    const { formatMessage } = this.props.intl;
    const messages = defineMessages({
      name_label: {
        id: 'recipe.create.name_label',
        description: 'Recipe name label',
        defaultMessage: 'Recipe name',
      },
      name_placeholder: {
        id: 'recipe.create.name_placeholder',
        description: 'Recipe name placeholder',
        defaultMessage: 'Recipe',
      },
      course_label: {
        id: 'recipe.create.course_label',
        description: 'Course label',
        defaultMessage: 'Course',
      },
      cuisine_label: {
        id: 'recipe.create.cuisine_label',
        description: 'Cuisine label',
        defaultMessage: 'Cuisine',
      },
      tags_label: {
        id: 'recipe.create.tags_label',
        description: 'Tags label',
        defaultMessage: 'Tags',
      },
      tags_placeholder: {
        id: 'recipe.create.tags_placeholder',
        description: 'Tags Placeholder',
        defaultMessage: 'Separate each tag by comma',
      },
      prep_time_label: {
        id: 'recipe.create.prep_time_label',
        description: 'Prep time label',
        defaultMessage: 'Prep time',
      },
      prep_time_placeholder: {
        id: 'recipe.create.prep_time_placeholder',
        description: 'Prep time placeholder',
        defaultMessage: 'Prep time in minutes',
      },
      cooking_time_label: {
        id: 'recipe.create.cooking_time_label',
        description: 'Cooking time label',
        defaultMessage: 'Cooking time',
      },
      cooking_time_placeholder: {
        id: 'recipe.create.cooking_time_placeholder',
        description: 'Cooking time placeholder',
        defaultMessage: 'Cooking time in minutes',
      },
      servings_label: {
        id: 'recipe.create.servings_label',
        description: 'Servings label',
        defaultMessage: 'Servings',
      },
      servings_placeholder: {
        id: 'recipe.create.servings_placeholder',
        description: 'Servings placeholder',
        defaultMessage: 'Servings',
      },
      rating_label: {
        id: 'recipe.create.rating_label',
        description: 'Rating label',
        defaultMessage: 'Rating',
      },
      rating_placeholder: {
        id: 'recipe.create.rating_placeholder',
        description: 'Rating placeholder',
        defaultMessage: 'Rate this recipe from 0 to 5',
      },
      subrecipes_label: {
        id: 'recipe.create.subrecipes_label',
        description: 'Recipe links label',
        defaultMessage: 'Recipe links',
      },
      ingredients_label: {
        id: 'recipe.create.ingredients_label',
        description: 'Recipe ingredients label',
        defaultMessage: 'Ingredients',
      },
      directions_label: {
        id: 'recipe.create.directions_label',
        description: 'Rating label',
        defaultMessage: 'Directions',
      },
      information_label: {
        id: 'recipe.create.information_label',
        description: 'Recipe information label',
        defaultMessage: 'Recipe information',
      },
      information_placeholder: {
        id: 'recipe.create.information_placeholder',
        description: 'Recipe information placeholder',
        defaultMessage: 'A quick description of the recipe',
      },
      source_label: {
        id: 'recipe.create.source_label',
        description: 'Rating source label',
        defaultMessage: 'Source',
      },
      source_placeholder: {
        id: 'recipe.create.source_placeholder',
        description: 'Rating source placeholder',
        defaultMessage: 'URL source of the recipe (if any)',
      },
      photo_label: {
        id: 'recipe.create.photo_label',
        description: 'Photo label',
        defaultMessage: 'Photo',
      },
      photo_placeholder: {
        id: 'recipe.create.photo_placeholder',
        description: 'Photo placeholder',
        defaultMessage: 'Photo',
      },
      optional: {
        id: 'recipe.create.optional',
        description: 'optional',
        defaultMessage: 'Optional',
      },
      public_label: {
        id: 'recipe.create.public_label',
        description: 'Recipe set public label',
        defaultMessage: 'Public Recipe',
      },
      submit: {
        id: 'recipe.create.submit',
        description: 'Submit recipe button',
        defaultMessage: 'Submit recipe',
      },
      save: {
        id: 'recipe.create.save',
        description: 'Save recipe button',
        defaultMessage: 'Save recipe',
      }
    });

    return (
      <div className="container">
        <div className="row">
          <form className="recipe-form">
            <div className="col-md-12">
              <Status
                  status={ this.props.status }
                  actions={ this.props.statusActions }
              />
            </div>
            <div id="recipe" className="col-lg-4 col-md-5">
              <img src={ this.getRecipeImage(this.props.form.photo_thumbnail) } />

              <File
                name="photo"
                placeholder={ formatMessage(messages.photo_placeholder) }
                accept="image/*"
                change={ this.props.recipeFormActions.update }
              />

              <div className="row">
                <Select
                  name="course"
                  data={ this.props.courses }
                  label={ formatMessage(messages.course_label) }
                  size="col-sm-6 col-xs-12"
                  change={ this.props.recipeFormActions.update }
                  value={ this.props.form.course || '' }
                  errors={ this.props.form.errors.course }
                />
                <Select
                  name="cuisine"
                  data={ this.props.cuisines }
                  label={ formatMessage(messages.cuisine_label) }
                  size="col-sm-6 col-xs-12"
                  change={ this.props.recipeFormActions.update }
                  value={ this.props.form.cuisine || ''  }
                  errors={ this.props.form.errors.cuisine }
                />
                <TagList
                  name="tags"
                  data={ this.props.tags }
                  label={ formatMessage(messages.tags_label) + " (" + formatMessage(messages.optional) + ")" }
                  size="col-sm-12 col-xs-12"
                  placeholder={ formatMessage(messages.tags_placeholder) }
                  change={ this.props.recipeFormActions.update }
                  tags={ this.props.form.tags || '' }
                  errors={ this.props.form.errors.tags }
                />
              </div>

              <div className="row">
                <Input
                  name="prep_time"
                  type="number"
                  label={ formatMessage(messages.prep_time_label) }
                  placeholder={ formatMessage(messages.prep_time_placeholder) }
                  size="col-sm-6 col-xs-12"
                  change={ this.props.recipeFormActions.update }
                  value={ this.props.form.prep_time || '' }
                  errors={ this.props.form.errors.prep_time }
                />
                <Input
                  name="cook_time"
                  type="number"
                  label={ formatMessage(messages.cooking_time_label) }
                  placeholder={ formatMessage(messages.cooking_time_placeholder) }
                  size="col-sm-6 col-xs-12"
                  change={ this.props.recipeFormActions.update }
                  value={ this.props.form.cook_time || '' }
                  errors={ this.props.form.errors.cook_time }
                />
              </div>
              <div className="row">
                <Input
                  name="servings"
                  type="number"
                  label={ formatMessage(messages.servings_label) }
                  placeholder={ formatMessage(messages.servings_placeholder) }
                  size="col-sm-6 col-xs-12"
                  change={ this.props.recipeFormActions.update }
                  value={ this.props.form.servings || '' }
                  errors={ this.props.form.errors.servings }
                />
                <Input
                  name="rating"
                  type="number"
                  label={ formatMessage(messages.rating_label) + " (" + formatMessage(messages.optional) + ")" }
                  placeholder={ formatMessage(messages.rating_placeholder) }
                  size="col-sm-6 col-xs-12"
                  change={ this.props.recipeFormActions.update }
                  value={ this.props.form.rating || '' }
                  errors={ this.props.form.errors.rating }
                />
              </div>
              <div className="row">
                <Input
                  name="source"
                  type="text"
                  size="col-xs-12"
                  label={ formatMessage(messages.source_label) + " (" + formatMessage(messages.optional) + ")" }
                  placeholder={ formatMessage(messages.source_placeholder) }
                  change={ this.props.recipeFormActions.update }
                  value={ this.props.form.source || '' }
                  errors={ this.props.form.errors.source }
                />
              </div>

            </div>
            <div id="recipe" className="col-lg-8 col-md-7">
              <Input
                name="title"
                type="text"
                label={ formatMessage(messages.name_label) }
                placeholder={ formatMessage(messages.name_placeholder) }
                change={ this.props.recipeFormActions.update }
                value={ this.props.form.title || '' }
                errors={ this.props.form.errors.title }
              />
              <TextArea
                name="info"
                rows="4"
                label={ formatMessage(messages.information_label) + " (" + formatMessage(messages.optional) + ")" }
                placeholder={ formatMessage(messages.information_placeholder) }
                change={ this.props.recipeFormActions.update }
                value={ this.props.form.info || '' }
                errors={ this.props.form.errors.info }
              />
              <IngredientBox
                name="ingredient_groups"
                id={ this.props.form.id }
                label={ formatMessage(messages.ingredients_label) }
                data={ this.props.form.ingredient_groups || '' }
                errors={ this.props.form.errors.ingredient_groups }
                change={ this.props.recipeFormActions.update }
              />
              <DirectionBox
                name="directions"
                label={ formatMessage(messages.directions_label) }
                data={ this.props.form.directions || '' }
                errors={ this.props.form.errors.directions }
                change={ this.props.recipeFormActions.update }
              />
              <SubRecipeBox
                name="subrecipes"
                id={ this.props.form.id }
                label={ formatMessage(messages.subrecipes_label) + " (" + formatMessage(messages.optional) + ")"  }
                data={ this.props.form.subrecipes || [] }
                errors={ this.props.form.errors.subrecipes }
                change={ this.props.recipeFormActions.update }
                fetchRecipeList={ this.props.recipeListActions.fetchRecipeList }
              />
              <Checkbox
                name="public"
                label={ formatMessage(messages.public_label) }
                change={ this.props.recipeFormActions.update }
                errors={ this.props.form.errors.public }
                checked={ this.props.form.public }
              />
              {
                this.props.form.id ?
                  <button
                    className="btn btn-success"
                    onClick={ this.save }>
                      { formatMessage(messages.save) }
                  </button> : ''
              }
              <button
                className="btn btn-primary"
                onClick={ this.submit }>
                  { formatMessage(messages.submit) }
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default injectIntl(RecipeForm);
