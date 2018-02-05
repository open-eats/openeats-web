import React from 'react'

require("../css/demo.scss");

const Demo = ({}) => (
  <div className="list-error demo-no-margin">
    <div className="alert alert-info demo-no-margin" role="alert">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <span className="glyphicon glyphicon-exclamation-sign"/>&nbsp;
            <span>DEMO NOTICE:</span>&nbsp;
            Everything is Read-Only! This is a demo version of the OpenEats and has no API connected to it.
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Demo;
