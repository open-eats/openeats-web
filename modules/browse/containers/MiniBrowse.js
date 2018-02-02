import React from 'react'
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ListRecipes from '../components/ListRecipes'
import * as MiniBrowseActions from "../actions/MiniBrowseActions";

require("./../css/browse.scss");

class MiniBrowse extends React.Component {
  componentDidMount() {
    this.props.miniBrowseActions.loadMiniBrowse(this.props.qs)
  }

  render() {
    return (
      <ListRecipes format={this.props.format} data={this.props.data} />
    );
  }
}

MiniBrowse.propTypes = {
  format: PropTypes.string.isRequired,
  qs: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  data: state.browse.miniBrowse,
});

const mapDispatchToProps = dispatch => ({
  miniBrowseActions: bindActionCreators(MiniBrowseActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MiniBrowse);
