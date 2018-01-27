import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames';
import PropTypes from 'prop-types'
import {
    injectIntl,
    defineMessages
} from 'react-intl';

import Filter from './Filter'

require("./../css/filter.scss");

class SearchMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
        nextProps.loading ||
        (
            nextProps.courses === undefined &&
            nextProps.cuisines === undefined &&
            nextProps.rating === undefined &&
            !nextProps.error
        )
    ) {
      return false;
    }
    return true;
  }

  toggleMenu = () => {
    this.setState({showMenu: !this.state.showMenu})
  };

  render() {
    const { courses, cuisines, ratings, qs, buildUrl, intl } = this.props;
    const messages = defineMessages({
      reset: {
        id: 'filter.reset',
        description: 'Filter reset',
        defaultMessage: 'Reset',
      },
      filter_course: {
        id: 'filter.filter_course',
        description: 'Filter field course',
        defaultMessage: 'Courses',
      },
      filter_cuisine: {
        id: 'filter.filter_cuisine',
        description: 'Filter field cuisine',
        defaultMessage: 'Cuisines',
      },
      filter_rating: {
        id: 'filter.filter_rating',
        description: 'Filter field rating',
        defaultMessage: 'Ratings',
      },
      filter_limit: {
        id: 'filter.filter_limit',
        description: 'Filter field limit',
        defaultMessage: 'Recipes per Page',
      },
      title: {
        id: 'filter.title',
        description: 'Title',
        defaultMessage: 'Title',
      },
      rating: {
        id: 'filter.rating',
        description: 'rating',
        defaultMessage: 'Rating',
      },
      pub_date: {
        id: 'filter.pub_date',
        description: 'pub_date',
        defaultMessage: 'Created Date',
      },
      filters: {
        id: 'filter.filters',
        description: 'Filters',
        defaultMessage: 'Filters',
      },
      show_filters: {
        id: 'filter.show_filters',
        description: 'Show Filters',
        defaultMessage: 'Show Filters',
      },
      hide_filters: {
        id: 'filter.hide_filters',
        description: 'Hide Filters',
        defaultMessage: 'Hide Filters',
      },
      filter_ordering: {
        id: 'filter.filter_ordering',
        description: 'Filter field ordering',
        defaultMessage: 'Ordering',
      },
      x_stars: {
        id: 'filter.x_stars',
        description: 'X Stars',
        defaultMessage: '{rating, number} stars',
      }
    });

    const activeFilter = Object.keys(qs).length !== 0;

    const reset = () => (
      <Link className="btn btn-default btn-danger reset-search hidden-xs" to={ buildUrl('', '') }>
        { intl.formatMessage(messages.reset) }
      </Link>
    );

    const mobileReset = () => (
      <Link className="clear-filter-mobile btn btn-danger" to={ buildUrl('', '') }>
        { intl.formatMessage(messages.reset) }
      </Link>
    );

    const resetMargin = activeFilter ? "reset-margin" : '';
    let mobileText = (
      <span>
        { intl.formatMessage(messages.show_filters) }
        <span className={"glyphicon glyphicon-chevron-down pull-right " + resetMargin}/>
      </span>
    );
    if (this.state.showMenu) {
      mobileText = (
        <span>
          { intl.formatMessage(messages.hide_filters) }
          <span className={"glyphicon glyphicon-chevron-up pull-right " + resetMargin}/>
        </span>
      );
    }

    const mobileHeader = (
      <div className="col-xs-12">
        <div className="sidebar-header" >
          <div className="filter-header" onClick={ this.toggleMenu }>
            { mobileText }
          </div>
          <div className="filter-header-clear">
            { activeFilter ? mobileReset() : '' }
          </div>
        </div>
      </div>
    );

    return (
      <div>
        <div className="row visible-xs">
          { mobileHeader }
        </div>
        <div className="row">
          <div className="col-xs-12 hidden-xs filter-title">
            { intl.formatMessage(messages.filters) }
          </div>
        </div>
        <div className={ classNames({"sidebar": true, "row": true, "hidden-xs": !this.state.showMenu}) }>
          <div className="col-sm-12 col-xs-4">
            <Filter
              title={ intl.formatMessage(messages.filter_course) }
              qsTitle="course"
              data={ courses || [] }
              qs={ qs }
              multiSelect={ true }
              buildUrl={ buildUrl }
            />
          </div>
          <div className="col-sm-12 col-xs-4">
            <Filter
              title={ intl.formatMessage(messages.filter_cuisine) }
              qsTitle="cuisine"
              data={ cuisines || [] }
              qs={ qs }
              multiSelect={ true }
              buildUrl={ buildUrl }
            />
          </div>
          <div className="col-sm-12 col-xs-4">
            <Filter
              title={ intl.formatMessage(messages.filter_rating) }
              qsTitle="rating"
              data={
                ratings ? ratings.map(r => {
                  r.slug = r.rating;
                  r.title = intl.formatMessage(messages.x_stars, {rating: r.rating});
                  return r;
                }) : []
              }
              qs={ qs }
              multiSelect={ true }
              buildUrl={ buildUrl }
            />
          </div>
          <div className="col-sm-12 hidden-xs">
            <Filter
              title={ intl.formatMessage(messages.filter_limit) }
              qsTitle="limit"
              data={[
                {id: 1, title: "4", slug: "4"},
                {id: 2, title: "8", slug: "8"},
                {id: 3, title: "16", slug: "16"},
              ]}
              qs={ qs }
              buildUrl={ buildUrl }
            />
          </div>
          <div className="col-sm-12 hidden-xs">
            <Filter
              title={ intl.formatMessage(messages.filter_ordering) }
              qsTitle="ordering"
              data={[
                {id: 1, title: intl.formatMessage(messages.title), slug: "title"},
                {id: 2, title: intl.formatMessage(messages.pub_date), slug: "-pub_date"},
                {id: 3, title: intl.formatMessage(messages.rating), slug: "-rating"},
              ]}
              qs={ qs }
              buildUrl={ buildUrl }
            />
          </div>
          { activeFilter ? reset() : '' }
        </div>
      </div>
    );
  }
}

SearchMenu.propTypes = {
  qs: PropTypes.object.isRequired,
  courses: PropTypes.array,
  cuisines: PropTypes.array,
  ratings: PropTypes.array,
  buildUrl: PropTypes.func.isRequired,
};

export default injectIntl(SearchMenu);
