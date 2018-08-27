import React from 'react'
import { Link } from 'react-router-dom'
import { Carousel } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { injectIntl, defineMessages } from 'react-intl'

import MiniBrowse from '../../browse/containers/MiniBrowse'
import ListRecipes from '../../browse/components/ListRecipes'
import documentTitle from '../../common/documentTitle'
import * as NewsActions from "../actions/NewsActions";

require("./../css/news.scss");

class News extends React.Component {
  componentDidMount() {
    if (!this.props.news.news) {
      this.props.newsActions.load();
    }
    if (this.props.user.id) {
      this.props.newsActions.loadUpcomingMenuItems();
    }
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

    let carouselItems = this.props.news.news ? this.props.news.news.map((entry) => {
      return (
        <Carousel.Item key={ entry.id }>
          { entry.image ? <img src={ entry.image } alt={ entry.title }/> : ''}
          <Carousel.Caption>
            <h3>{ entry.title }</h3>
            <p dangerouslySetInnerHTML={{ __html: entry.content }}/>
          </Carousel.Caption>
        </Carousel.Item>
      );
    }) : '';

    return (
      <div>
        <Carousel>
          { carouselItems }
        </Carousel>
        <div className="container">
          <div className="row">
            { this.props.news.menuItems ?
              <div>
                <h3>On the Menu</h3>
                <ListRecipes
                  format="col-xs-12 col-sm-6 col-md-3"
                  data={this.props.news.menuItems}
                />
              </div> : ''
            }
          </div>
          <h3>Recommended Recipes</h3>
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

const mapStateToProps = state => ({
  news: state.news,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  newsActions: bindActionCreators(NewsActions, dispatch),
});

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(News));
