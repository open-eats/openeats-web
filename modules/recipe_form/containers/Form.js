import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as RecipeFormActions from '../actions/RecipeFormActions'
import * as RecipeGroupActions from '../actions/RecipeGroupActions'
import * as RecipeListActions from '../actions/RecipeListActions'
import * as StatusActions from '../actions/StatusActions'
import bindIndexToActionCreators from '../../common/bindIndexToActionCreators'
import history from '../../common/history'
import authCheckRedirect from '../../common/authCheckRedirect'
import documentTitle from '../../common/documentTitle'

import Loading from '../../base/components/Loading'
import RecipeForm from '../components/RecipeForm'

class From extends React.Component {
  componentDidMount() {
    authCheckRedirect();
    window.scrollTo(0, 0);
    this.props.recipeGroupActions.fetchCuisines();
    this.props.recipeGroupActions.fetchCourses();
    this.props.recipeGroupActions.fetchTags();
    if (this.props.match.params.recipe) {
      this.props.recipeFormActions.load(this.props.match.params.recipe);
    } else {
      this.props.recipeFormActions.create()
    }
  }

  componentWillUnmount() {
    documentTitle();
    this.props.statusActions.close();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.recipe != this.props.match.params.recipe) {
      window.scrollTo(0, 0);
      nextProps.statusActions.close();
      if (nextProps.match.params.recipe && !this.props.form.find(t => t.slug == nextProps.match.params.recipe)) {
        nextProps.recipeFormActions.load(nextProps.match.params.recipe);
      } else {
        nextProps.recipeFormActions.create()
      }
    }
  }

  render() {
    let { user, tags, courses, cuisines, form, status } = this.props;
    let {
      recipeGroupActions,
      recipeFormActions,
      statusActions
    } = this.props;
    let slug = this.props.match.params.recipe || '';
    let selectForm = form.find(t => t.slug == slug);
    if (selectForm) {
      if (user !== null && (slug == '' || user.id === selectForm.author)) {
        documentTitle(selectForm.title);
        return (
          <RecipeForm
            tags={ tags }
            courses={ courses }
            cuisines={ cuisines }
            status={ status }
            form={ selectForm }
            statusActions={ statusActions }
            recipeGroupActions={ recipeGroupActions }
            recipeFormActions={ recipeFormActions }
            recipeListActions={ RecipeListActions }
          />
        );
      }
      history.push('/recipe/' + selectForm.slug);
      return (<div/>)
    } else {
      return ( <Loading message="Loading"/> )
    }
  }
}

From.propTypes = {
  tags: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  cuisines: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  form: PropTypes.array.isRequired,
  statusActions: PropTypes.object.isRequired,
  recipeGroupActions: PropTypes.object.isRequired,
  recipeFormActions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  form: state.recipeForm.form,
  status: state.recipeForm.status,
  tags: state.recipeForm.recipeGroups.tags,
  courses: state.recipeForm.recipeGroups.courses,
  cuisines: state.recipeForm.recipeGroups.cuisines,
});

const mapDispatchToProps = (dispatch, props) => ({
  recipeGroupActions: bindActionCreators(RecipeGroupActions, dispatch),
  statusActions: bindActionCreators(StatusActions, dispatch),
  recipeFormActions: bindActionCreators(
    bindIndexToActionCreators(
      RecipeFormActions,
      props.match.params.recipe || ''
    ),
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(From);
