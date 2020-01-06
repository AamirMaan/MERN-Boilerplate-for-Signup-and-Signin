import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";
import "react-toastify/cjs/react-toastify.min";

import { isAuth, getCookie, signout, updateUser } from "../auth/helpers";

const Admin = ({ history }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    buttonText: "Submit"
  });
  const token = getCookie("token");

  const loadProfile = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        //console.log("Get User Response:", response);
        const { role, name, email } = response.data;
        setValues({
          ...values,
          role,
          name,
          email
        });
      })
      .catch(error => {
        //console.log("Get User Error:", error.response.data);
        if (error.response.status === 401) {
          signout(() => {
            history.push("/signin");
          });
        }
      });
  };
  useEffect(() => {
    loadProfile();
  }, []);
  const { name, email, role, password, buttonText } = values;

  const handleChange = name => event => {
    //console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };
  const handleSubmit = event => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/user/admin/update`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: { name, password }
    })
      .then(response => {
        //console.log("Profile Updated Success:", response);
        updateUser(response, () => {
          setValues({
            ...values,
            buttonText: "Submit"
          });
          toast.success("Profile Updated Successfully.");
        });
      })
      .catch(error => {
        //console.log("Profile Update Error:", error.response.data);
        setValues({
          ...values,
          buttonText: "Submit"
        });
        toast.error(error.response.data.error);
      });
  };
  const updateForm = () => (
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
        <label className="text-muted">Role</label>
        <input
          type="text"
          defaultValue={role}
          className="form-control"
          disabled
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          defaultValue={email}
          className="form-control"
          disabled
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
      <h1 className="p-5 text-center">Profile Update</h1>
      {updateForm()}
    </div>
  );
};
export default Admin;
