import React, { useState,useEffect } from "react";
import axios from 'axios'

export default function Login() {
  const REACT_APP_GITHUB_AUTHORIZED_URL = `${process.env.REACT_APP_AUTHORIZE_URL}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
  const [LoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get(
      "access_token"
    );

    axios
      .get(process.env.REACT_APP_GITHUB_USER_API, {
        headers: {
          Authorization: "token " + token,
        },
      })
      .then((res) => {
        setUser(res.data);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.log("error " + error);
      });
  }, []);

  return ( 
    <div> {
      LoggedIn ? ( 
        <div> 
          Welcome {user.name} </div>
      ) : ( 
      <a href = {REACT_APP_GITHUB_AUTHORIZED_URL}  >
         Sign in
      </a>
      )
    } 
    </div>
  );
}