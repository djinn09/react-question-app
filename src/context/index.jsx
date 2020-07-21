import React, { useReducer, useContext, createContext } from "react";
import Cookies from "js-cookie";
// import { useHistory } from "react-router-dom";
import ApiInstance from "../api";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

export const Actions = {
  login: "LOGIN",
  logout: "LOGOUT",
};

const getInitialState = () => {
  let cookie = Cookies.get("token");
  let user = localStorage.getItem("auth");
  // let access = Cookies.get("access");
  console.log(cookie, user, "COK");
  if (
    (cookie !== null && cookie !== undefined) ||
    (user !== null && user !== undefined)
  ) {
    const data = JSON.parse(cookie);

    let state = {
      isAuthenticated: data ? true : false,
      user: user,
      token: data,
    };
    return state;
  }
  return initialState;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      Cookies.set("token", JSON.stringify(action.payload.token), {
        expires: 1,
      });
      localStorage.setItem("auth", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
      };
    case "LOGOUT":
      localStorage.removeItem("auth");
      Cookies.remove("token");
      localStorage.clear();
      return initialState;
    default:
      throw new Error();
  }
};

export const AuthContext = createContext({
  appState: initialState,
  dispatch: () => {},
  logout: () => {},
});

export const AppStateProvide = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, getInitialState);

  const logout = async () => {
    let token = Cookies.get("token");
    if (token !== null && token !== undefined) {
      try {
        const response = ApiInstance.post("/logout");
        if (response.status === 200) {
          dispatch({
            type: Actions.logout,
            payload: null,
          });
        } else {
          dispatch({
            type: Actions.logout,
            payload: null,
          });
        }
      } catch (error) {
        dispatch({
          type: Actions.logout,
          payload: null,
        });
      }
    }
  };

  const value = {
    appState: state,
    dispatch,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAppState = () => useContext(AuthContext);
