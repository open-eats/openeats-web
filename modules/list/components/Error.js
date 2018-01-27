"use strict";

import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, defineMessages } from 'react-intl'

const Error = ({message, intl}) => {
  const messages = defineMessages({
    error: {
      id: 'list.error.message',
      description: 'Error!',
      defaultMessage: 'Something went wrong!',
    }
  });

  return (
    <div className="list-error">
      <div className="alert alert-danger" role="alert">
        <span className="glyphicon glyphicon-exclamation-sign"/>&nbsp;
        <span>{ intl.formatMessage(messages.error) }: </span>
        { message }
      </div>
    </div>
  );
};

Error.propTypes = {
  message: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired
};

export default injectIntl(Error)
