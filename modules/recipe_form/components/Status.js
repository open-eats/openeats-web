import React from 'react'

class Status extends React.Component {
  render() {
    if (this.props.status.message.length > 1) {
      let cssClass = "alert alert-info alert-dismissible";
      if (this.props.status.alert) {
        cssClass = "alert alert-dismissible " + this.props.status.alert;
      }
      return (
        <div className="row">
          <div className="col-xs-12">
            <div className={ cssClass } role="alert">
              <button type="button" className="close" data-dismiss="alert" onClick={ this.props.actions.close }>
                <span>&times;</span>
              </button>
              { this.props.status.message }
            </div>
          </div>
        </div>
      )
    }
    return (
      <span/>
    )
  }
}

export default Status;
