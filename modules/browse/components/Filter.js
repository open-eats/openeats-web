import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';
import { Link } from 'react-router-dom'

const Filter = ({title, qsTitle, data, qs, multiSelect, cssClass, buildUrl}) => {
  const items = data.map((item) => {
    if (item.total == 0) {
      return null;
    }

    let active = false;
    if (qs[qsTitle]) {
      if (qs[qsTitle].split(',').includes(item.slug.toString())) {
        active = true;
      }
    }

    return (
      <div key={ item.slug } >
        <Link to={ buildUrl(qsTitle, item.slug, multiSelect) } className={ classNames({"list-group-item": true, "active": active }) }>
          { active ? <span className="glyphicon glyphicon-remove"/> : null }
          { item.title }
          { item.total ? <span className="badge">{ item.total }</span> : '' }
        </Link>
      </div>
    );
  });

  return (
    <div className={ "list-group filter " + cssClass }>
      { title }
      { items }
    </div>
  );
};

Filter.propTypes = {
  title: PropTypes.string.isRequired,
  qsTitle: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  multiSelect: PropTypes.bool,
  qs: PropTypes.object.isRequired,
  cssClass: PropTypes.string,
  buildUrl: PropTypes.func.isRequired,
};

export default Filter;