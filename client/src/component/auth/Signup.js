import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";
import "react-toastify/cjs/react-toastify.min";

import { isAuth } from "./helpers";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    buttonText: "Submit"
  });
  const { name, email, password, buttonText } = values;

  const handleChange = name => event => {
    //console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };
  const handleSubmit = event => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signup`,
      data: { name, email, password }
    })
      .then(response => {
        console.log("Signup Success:", response);
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          buttonText: "Submitted"
        });
        toast.success(response.data.message);
      })
      .catch(error => {
        console.log("Signup Error:", error.response.data);
        setValues({
          ...values,
          buttonText: "Submit"
        });
        toast.error(error.response.data.name);
        toast.error(error.response.data.email);
        toast.error(error.response.data.password);
      });
  };
  const signupForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          onChange={handleChange("name")}
          value={name}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          onChange={handleChange("email")}
          value={email}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="password"
          onChange={handleChange("password")}
          value={password}
          className="form-control"
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
      {isAuth() ? <Redirect to="/" /> : null}
      <h1 className="p-5 text-center">Signup</h1>
      {signupForm()}
    </div>
  );
};
export default Signup;
