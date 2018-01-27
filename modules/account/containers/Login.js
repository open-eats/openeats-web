import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import * as AuthActions from '../actions/AuthActions'
import LoginForm from '../components/LoginForm'
import history from '../../common/history'
import documentTitle from '../../common/documentTitle'

class Login extends React.Component {
  componentDidMount() {
    if (this.props.user.id) {
      history.push('/');
    }
  }

  componentWillUnmount() {
    documentTitle();
  }

  render() {
    let { user, authActions, intl } = this.props;
    documentTitle(intl.messages['nav.login.title']);
    return (
        <LoginForm
          user={ user }
          authActions={ authActions }
        />
    );
  }
}

Login.propTypes = {
  user: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  authActions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch, props) => ({
  authActions: bindActionCreators(AuthActions, dispatch),
});

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(Login));
