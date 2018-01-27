import React from 'react'
import Spinner from 'react-spinkit';

const Loading = () => {
  return (
    <div className="row">
      <div className="col-xs-12">
        <div id="browse" className="row">
          <div className="spinner">
            <Spinner className="spinner-obj" spinnerName="circle" noFadeIn />
          </div>
        </div>
      </div>
    </div>
  )
};

export default Loading;