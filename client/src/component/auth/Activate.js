import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";
import "react-toastify/cjs/react-toastify.min";

const Activate = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    token: "",
    show: true
  });
  useEffect(() => {
    const token = match.params.token;
    //console.log(token);
    if (token) {
      let { name } = jwt.decode(token);
      setValues({ ...values, name, token });
    }
  }, []);
  const { name, token, show } = values;

  const handleSubmit = event => {
    event.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/account-activation`,
      data: { token }
    })
      .then(response => {
        console.log("Account Activation Success:", response);
        setValues({
          ...values,
          show: false
        });
        toast.success(response.data.message);
      })
      .catch(error => {
        console.log("Account Activation Error:", error.response.data);
        toast.error(error.response.data.error);
      });
  };
  const activateAccount = () => (
    <div className="text-center">
      <h1 className="p-5">Hey {name}, Ready to activate your account?</h1>
      <button className="btn btn-outline-primary" onClick={handleSubmit}>
        Activate Account
      </button>
    </div>
  );
  return (
    <div className="col-md-6 col-md-offset-3">
      <ToastContainer />
      {show ? <Redirect to="/signin" /> : null}
      {activateAccount()}
    </div>
  );
};
export default Activate;
