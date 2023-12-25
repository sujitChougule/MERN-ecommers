import React, { Fragment, useState, useEffect } from "react";

import { HiOutlineMail } from "react-icons/hi";
import "./styles/forgotPassword.scss";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../layouts/Loader/Loader";
import MetaData from "../layouts/MetaDate";
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { message, loading, error } = useSelector(
    (state) => state.forgotPassword
  );
  const [email, setEmail] = useState();
  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("email", email);

    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
    }
  }, [dispatch, alert, error, message]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordUpContainer">
            <div className="forgotPasswordUpBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>
              <form
                className="forgotPasswordForm"
                encType="mutipart/form-data"
                onSubmit={forgotPasswordSubmit}>
                <div className=" forgotPasswordEmail">
                  <HiOutlineMail />

                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Update"
                  className=" forgotPasswordUpBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
