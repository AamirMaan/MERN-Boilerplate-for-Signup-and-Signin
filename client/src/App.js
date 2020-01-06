import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from "./component/Layout/Navbar";
import Footer from "./component/Layout/Footer";
import Landing from "./component/Layout/Landing";
import Signup from "./component/auth/Signup";
import Signin from "./component/auth/Signin";
import Activate from "./component/auth/Activate";
import Forgot from "./component/auth/Forgot";
import Reset from "./component/auth/Reset";
import AdminRoute from "./component/auth/AdminRoute";
import PrivateRoute from "./component/auth/PrivateRoute";
import Admin from "./component/Private/Admin";
import Subscriber from "./component/Private/Subscriber";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Route path="/" exact component={Landing} />
      <div className="container">
        <Switch>
          <Route path="/signup" exact component={Signup} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/auth/activate/:token" exact component={Activate} />
          <AdminRoute path="/admin" exact component={Admin} />
          <PrivateRoute path="/subscriber" exact component={Subscriber} />
          <Route path="/forgot-password" exact component={Forgot} />
          <Route path="/reset-password/:token" exact component={Reset} />
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
