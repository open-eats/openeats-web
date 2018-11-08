import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Loading from '../../base/components/Loading'
import MenuItemModal from '../../menu/components/modals/MenuItemModal'
import RecipeScheme from '../components/RecipeScheme'
import * as RecipeActions from '../actions/RecipeActions'
import * as RecipeItemActions from '../actions/RecipeItemActions'
import * as MenuItemActions from '../../menu/actions/MenuItemActions'
import bindIndexToActionCreators from '../../common/bindIndexToActionCreators'
import documentTitle from '../../common/documentTitle'
import {fetchRecipeList} from "../../menu/actions/RecipeListActions";
import {menuItemValidation} from "../../menu/actions/validation";

require("./../css/recipe.scss");

class Recipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenuModal: false,
    };
  }
  componentDidMount() {
    this.props.recipeActions.load(this.props.match.params.recipe);
  }

  componentWillUnmount() {
    documentTitle();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.recipe !== this.props.match.params.recipe) {
      nextProps.recipeItemActions.reset();
      nextProps.recipeActions.load(nextProps.match.params.recipe);
      window.scrollTo(0, 0);
    }
  }

  render() {
    let { lists, recipes, match, status, user } = this.props;
    let { recipeActions, recipeItemActions } = this.props;
    let { showItemModal } = this.state;
    let data = recipes.find(t => t.slug === match.params.recipe);
    if (data) {
      let showEditLink = (user !== null && user.id === data.author);
      documentTitle(data.title);
      return (
        <div>
          <MenuItemModal
            id={ 0 }
            show={ showItemModal }
            onHide={ () => { this.setState({showItemModal: false}) } }
            recipe={data.id}
            title={data.title}
            onSave={ this.props.menuItemActions.save }
            fetchRecipeList={ fetchRecipeList }
            validation={ menuItemValidation }
          />
          <RecipeScheme
            { ...data }
            listStatus={ status }
            lists={ lists }
            addToMenu={ () => { this.setState({showItemModal: true}) } }
            showEditLink={ showEditLink }
            recipeActions={ recipeActions }
            recipeItemActions={ recipeItemActions }
          />
        </div>
      );
    } else {
      return ( <Loading message="Loading"/> )
    }
  }
}

Recipe.propTypes = {
  recipes: PropTypes.array.isRequired,
  lists: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  recipeActions: PropTypes.object.isRequired,
  recipeItemActions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  recipes: state.recipe.recipes,
  status: state.recipe.status,
  lists: state.list.lists,
});

const mapDispatchToProps = (dispatch, props) => ({
  recipeItemActions: bindActionCreators(RecipeItemActions, dispatch),
  menuItemActions: bindActionCreators(MenuItemActions, dispatch),
  recipeActions: bindActionCreators(
    bindIndexToActionCreators(RecipeActions, props.match.params.recipe),
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recipe);
