import React from 'react'
import { Link } from 'react-router-dom'
import { Carousel } from 'react-bootstrap'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl'

import { request } from '../../common/CustomSuperagent';
import MiniBrowse from '../../browse/containers/MiniBrowse'
import { serverURLs } from '../../common/config'
import documentTitle from '../../common/documentTitle'

require("./../css/news.scss");

class News extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      news: [],
    };

    this.loadNewsFromServer = this.loadNewsFromServer.bind(this);
  }

  loadNewsFromServer() {
    let url = serverURLs.news;
    request()
      .get(url)
      .end((err, res) => {
        if (!err && res) {
          this.setState({ news: res.body.results });
        } else {
          console.error(url, err.toString());
        }
      })
  }

  componentDidMount() {
    this.loadNewsFromServer();
  }

  componentWillUnmount() {
    documentTitle();
  }

  render() {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      browseRecipeButton: {
        id: 'news.browse_recipe_button',
        description: 'Browse All Recipes',
        defaultMessage: 'Browse All Recipes',
      },
    });
    documentTitle(this.props.intl.messages['nav.news']);

    let carouselItems = this.state.news.map((entry) => {
      return (
        <Carousel.Item key={ entry.id }>
          <img src={ entry.image }/>
          <Carousel.Caption>
            <h3>{ entry.title }</h3>
            <p dangerouslySetInnerHTML={{ __html: entry.content }}/>
          </Carousel.Caption>
        </Carousel.Item>
      );
    });

    return (
      <div>
        <Carousel>
          { carouselItems }
        </Carousel>
        <div className="container">
          <div className="row">
            <MiniBrowse format="col-xs-12 col-sm-6 col-md-3" qs="?limit=4" />
          </div>
          <div className="row home-buttons">
            <div className="col-md-4 col-md-push-4 col-sm-6 col-sm-push-3 col-xs-12">
              <Link to="/browse" className="btn btn-primary home-browse-button">
                { formatMessage(messages.browseRecipeButton) }
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(News);
