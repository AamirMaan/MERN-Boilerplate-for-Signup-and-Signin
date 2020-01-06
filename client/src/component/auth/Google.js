import React from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";

const Google = ({ informParent = f => f }) => {
  const responseGoogle = response => {
    //console.log(response.tokenId);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/google-login`,
      data: { idToken: response.tokenId }
    })
      .then(response => {
        console.log("Google signin success:", response);
        //inform parent component
        informParent(response);
      })
      .catch(error => {
        console.log("Google signin success:", error.response);
      });
  };
  return (
    <div className="pb-3">
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        render={renderProps => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className="btn btn-primary btn-lg btn-block"
          >
            <i className="fab fa-google pr-2" /> Login with Google
          </button>
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};
export default Google;
