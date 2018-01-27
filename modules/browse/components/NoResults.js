import React from 'react'
import PropTypes from 'prop-types'
import {
    injectIntl,
    defineMessages
} from 'react-intl';

const NoResults = ({intl}) => {
  const messages = defineMessages({
    no_results: {
      id: 'browse.no_results',
      description: 'No results header',
      defaultMessage: 'Sorry, there are no results for your search.',
    }
  });

  return (
    <div className="row">
      <div className="col-xs-12">
        <div id="browse" className="row">
          <div className="spinner">
            <h3 className="no-results">{ intl.formatMessage(messages.no_results) }</h3>
          </div>
        </div>
      </div>
    </div>
  )
};

NoResults.propTypes = {
  intl: PropTypes.object
};

export default injectIntl(NoResults);