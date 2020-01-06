import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";
import "react-toastify/cjs/react-toastify.min";

const Forgot = ({ history }) => {
  const [values, setValues] = useState({
    email: "",
    buttonText: "Request Password Reset Link"
  });
  const { email, buttonText } = values;

  const handleChange = name => event => {
    //console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };
  const handleSubmit = event => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/forgot-password`,
      data: { email }
    })
      .then(response => {
        //console.log("Forgot Password Success:", response);
        toast.success(response.data.message);
        setValues({ ...values, buttonText: "Requested" });
      })
      .catch(error => {
        //console.log("Forgot Password Error:", error.response.data);
        toast.error(error.response.data.error);
        toast.error(error.response.data.email);
        setValues({
          ...values,
          buttonText: "Request Password Reset Link"
        });
      });
  };
  const forgotPasswordForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          onChange={handleChange("email")}
          value={email}
          className="form-control"
          placeholder="Enter your Email"
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
      <h1 className="p-5 text-center">Forgot Password</h1>
      {forgotPasswordForm()}
    </div>
  );
};
export default Forgot;
