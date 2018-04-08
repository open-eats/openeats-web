import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl';

require("../css/footer.scss");

class Footer extends React.Component{
  render() {
    return (
      <footer className="footer print-hidden">
        <div className="container">
          <p className="text-muted">
            <FormattedMessage
              id='footer.credit'
              description='Footer credit'
              defaultMessage='Created with {link}'
              values={{
                link: <a href="https://github.com/open-eats/OpenEats">OpenEats</a>
              }}
            />
            &nbsp;-&nbsp;
            <FormattedMessage
              id='footer.icon_credit'
              description='Footer icons credit'
              defaultMessage='Icons by {link} ({ccLink})'
              values={{
                link: <a href="http://www.flaticon.com/authors/nikita-golubev" title="Nikita Golubev">Nikita Golubev</a>,
                ccLink: <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons">CC BY 3.0</a>
              }}
            />
          </p>
        </div>
      </footer>
    );
  }
}

export default injectIntl(Footer);
