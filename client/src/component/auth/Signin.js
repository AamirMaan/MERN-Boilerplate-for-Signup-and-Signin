import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";
import "react-toastify/cjs/react-toastify.min";

import { authenticate, isAuth } from "./helpers";
import Google from "./Google";

const Signin = ({ history }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    buttonText: "Sign In"
  });
  const { email, password, buttonText } = values;

  const handleChange = name => event => {
    //console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };
  const informParent = response => {
    authenticate(response, () => {
      isAuth() && isAuth().role === "admin"
        ? history.push("/admin")
        : history.push("subscriber");
    });
  };
  const handleSubmit = event => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signin`,
      data: { email, password }
    })
      .then(response => {
        console.log("Signin Success:", response);
        // save the response(user, token) in localstorage/cookie

        authenticate(response, () => {
          setValues({
            ...values,
            email: "",
            password: "",
            buttonText: "Submitted"
          });
          toast.success(`Hey ${response.data.user.name}, Welcome back!`);
          isAuth() && isAuth().role === "admin"
            ? history.push("/admin")
            : history.push("subscriber");
        });
      })
      .catch(error => {
        console.log("Signin Error:", error.response.data);
        setValues({
          ...values,
          buttonText: "Sign In"
        });
        toast.error(error.response.data.error);
        toast.error(error.response.data.email);
        toast.error(error.response.data.password);
      });
  };
  const signinForm = () => (
    <form>
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
      <h1 className="p-5 text-center">Log In</h1>
      <Google informParent={informParent} />
      {signinForm()}
      <Link to="/forgot-password">Forgot Password</Link>
    </div>
  );
};
export default Signin;
