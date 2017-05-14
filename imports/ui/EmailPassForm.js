import React, { Component, PropTypes } from 'react';

export default class EmailPassForm extends Component{

  render(){

    return(
      <form onSubmit={this.props.submitAction}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input placeholder="Email" type="email" id="email" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="pass">Password:</label>
          <input placeholder="Password" type="password" id="pass" className="form-control" />
        </div>
        <div className="form-group">
          <button type="submit" className="form-control">{this.props.submitButtonLabel}</button>
        </div>
      </form>

    );
  }
}

EmailPassForm.propTypes = {
  submitAction: PropTypes.func.isRequired,
};

EmailPassForm.defaultProps = {
  submitButtonLabel : 'Submit'
};
