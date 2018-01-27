import React from 'react'
import {
    injectIntl,
    defineMessages
} from 'react-intl';


const Alert = ({ intl }) => {
  const messages = defineMessages({
    title: {
      id: 'login.alert.unable_to_login',
      description: 'Fail to login header',
      defaultMessage: 'Unable to login!',
    },
    message: {
      id: 'login.alert.confirm',
      description: 'Fail to login message',
      defaultMessage: 'Please confirm that the username and password are correct.',
    }
  });

  return (
    <div className="alert alert-danger">
      <strong>{ intl.formatMessage(messages.title) }</strong>
      { intl.formatMessage(messages.message) }
    </div>
  )
};

export default injectIntl(Alert)
