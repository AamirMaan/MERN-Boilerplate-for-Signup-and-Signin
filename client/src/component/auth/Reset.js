import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";
import "react-toastify/cjs/react-toastify.min";

const Reset = ({ match }) => {
  //props.match from react router dom
  const [values, setValues] = useState({
    name: "",
    token: "",
    newPassword: "",
    buttonText: "New Password"
  });
  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);
    if (token) {
      setValues({ ...values, name, token });
    }
  }, []);
  const { name, token, newPassword, buttonText } = values;

  const handleChange = event => {
    //console.log(event.target.value);
    setValues({ ...values, newPassword: event.target.value });
  };
  const handleSubmit = event => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/reset-password`,
      data: { newPassword, resetPasswordLink: token }
    })
      .then(response => {
        console.log("Reset Password Success:", response);
        toast.success(response.data.message);
        setValues({ ...values, buttonText: "Done" });
      })
      .catch(error => {
        console.log("Reset Password Error:", error.response.data);
        toast.error(error.response.data.error);
        toast.error(error.response.data.password);
        setValues({
          ...values,
          buttonText: "New Password"
        });
      });
  };
  const resetPasswordForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">New Password</label>
        <input
          type="password"
          onChange={handleChange}
          value={newPassword}
          className="form-control"
          placeholder="Type New Password"
          required
        />
      </div>

      <div className="form-group">
        <button
          type="submit"
          onClick={handleSubmit}
          value={name}
          className="btn btn-primary"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );

  return (
    <div className="col-md-6 offset-md-3">
      <ToastContainer />
      <h1 className="p-5 text-center">Hey {name}, Type your new password</h1>
      {resetPasswordForm()}
    </div>
  );
};
export default Reset;
