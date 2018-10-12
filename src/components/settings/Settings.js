import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  setAllowRegistration,
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit
} from "../../actions/settingAction";

class Settings extends Component {
  disableBalanceOnAddChange = () => {
    const { setDisableBalanceOnAdd } = this.props;
    setDisableBalanceOnAdd();
  };
  disableBalanceOnEditChange = () => {
    const { setDisableBalanceOnEdit } = this.props;
    setDisableBalanceOnEdit();
  };
  allowRegistrationChange = () => {
    const { setAllowRegistration } = this.props;
    setAllowRegistration();
  };
  render() {
    const {
      disableBalanceOnAdd,
      disableBalanceOnEdit,
      allowRegistration
    } = this.props.settings;
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Back To Dashboard
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Edit Settings</div>
          <form>
            <div className="form-control">
              <label>Allow Registration</label>
              <input
                type="checkbox"
                name="allowRegistration"
                checked={!!allowRegistration}
                onChange={this.allowRegistrationChange}
              />
            </div>
            <div className="form-control">
              <label>Disable Balance On Add</label>
              <input
                type="checkbox"
                name="disableBalanceOnAdd"
                checked={!!disableBalanceOnAdd}
                onChange={this.disableBalanceOnAddChange}
              />
            </div>
            <div className="form-control">
              <label>Disable Balance On Edit</label>
              <input
                type="checkbox"
                name="disableBalanceOnEdit"
                checked={!!disableBalanceOnEdit}
                onChange={this.disableBalanceOnEditChange}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  setAllowRegistration: PropTypes.func.isRequired,
  setDisableBalanceOnAdd: PropTypes.func.isRequired,
  setDisableBalanceOnEdit: PropTypes.func.isRequired
};

export default connect(
  (state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }),
  { setAllowRegistration, setDisableBalanceOnAdd, setDisableBalanceOnEdit }
)(Settings);
