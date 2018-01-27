"use strict";

import React from 'react'
import PropTypes from 'prop-types'
import Spinner from 'react-spinkit';

const Loading = ({ message }) => {
  return (
    <div className="spinner">
      <h3 className="no-results">{ message }</h3>
      <Spinner className="spinner-obj" spinnerName="circle" noFadeIn />
    </div>
  );
};

Loading.propTypes = {
  message: PropTypes.string,
};

export default Loading
