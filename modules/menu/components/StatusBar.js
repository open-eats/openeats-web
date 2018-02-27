import React from 'react'

const Status = ({ alert, message, close }) => {
  if (message.length > 1) {
    let cssClass = "alert alert-info alert-dismissible";
    if (alert) {
      cssClass = "alert alert-dismissible " + alert;
    }
    return (
      <div className="row">
        <div className="col-xs-12">
          <div className={ cssClass } role="alert">
            <button type="button" className="close" data-dismiss="alert" onClick={ close }>
              <span>&times;</span>
            </button>
            { message }
          </div>
        </div>
      </div>
    )
  }
  return (
    <span/>
  )
};

export default Status;
