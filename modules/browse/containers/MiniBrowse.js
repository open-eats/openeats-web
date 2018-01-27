import React from 'react'
import PropTypes from 'prop-types';
import { request } from '../../common/CustomSuperagent';
import ListRecipes from '../components/ListRecipes'
import { serverURLs } from '../../common/config'

require("./../css/browse.scss");

class MiniBrowse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data || []
    };
  }

  componentDidMount() {
    request()
      .get(serverURLs.mini_browse + this.props.qs)
      .then(res => { this.setState({data: res.body.results}) })
  }

  render() {
    return (
      <ListRecipes format={this.props.format} data={this.state.data} />
    );
  }
}

MiniBrowse.propTypes = {
  format: PropTypes.string.isRequired,
  qs: PropTypes.string.isRequired
};

export default MiniBrowse;
