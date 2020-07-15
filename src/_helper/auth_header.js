import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";

export const Usetoken = ({ url, username, password }) => {
  const [token, SetToken] = useState(null);
  const GetToken = async () => {
    const tokn = await axios.post(url, {
      username: username,
      password: password,
    });
    if (tokn.data && tokn.response === 200) {
      SetToken(tokn.data);
      localStorage.setItem("user", tokn.data.token);
      return true;
    }
    return false;
  };
};
