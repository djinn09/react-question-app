import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button, Alert } from "react-bootstrap";
import Loader from "../_components/Loader";
import { verifyEmail } from "../utills";
import UserAuthApi from "./Service.js";
import { useAppState, Actions } from "../context";

function LoginPopUp(props) {
  const { dispatch } = useAppState();
  const [state, setState] = useState({
    email: "",
    password: "",
    loading: false,
  });
  // const [loading, setLoading] = useState(false);

  const [error, setError] = useState({
    // show: false,
    alert: false,
    alertMessage: "",
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!verifyEmail(state.email)) {
      setError((prevState) => ({
        ...prevState,
        alertMessage: "Please Enter valid email",
        alert: true,
      }));
      return;
    }
    if (!state.password) {
      setError((prevState) => ({
        ...prevState,
        alertMessage: "Please enter valid Credentials",
        alert: true,
      }));
      return;
    }
    setState((prevState) => ({ ...prevState, loading: true }));
    try {
      const data = await UserAuthApi({
        email: state.email,
        password: state.password,
      });

      let token = data.token;
      var encodedString = btoa(token);
      // Cookies.set("token", encodedString, { expires: 1 });
      // localStorage.setItem("auth", data.email);
      dispatch({
        type: Actions.login,
        payload: {
          token: encodedString,
          user: data.email,
        },
      });
      clearFormFields();
    } catch (error) {
      setError((prevState) => ({
        ...prevState,
        alertMessage: "Please enter valid Credentials",
        alert: true,
      }));
    }
  };
  const clearFormFields = () => {
    let { onHide } = props;
    onHide();
    setState({
      email: "",
      password: "",
      loading: false,
    });
    setError({
      alert: false,
      alertMessage: "",
    });
  };
  const OnChange = (event) => {
    let value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  };
  const { show } = props;

  return (
    <Modal
      show={show}
      onHide={clearFormFields}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {state.loading ? (
          <Loader animation="border" size="lg" />
        ) : (
          <Form onSubmit={onSubmit}>
            <Form.Group className="form-group">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                placeholder="Enter Email"
                className="form-control"
                type="email"
                required
                onChange={OnChange}
                value={state.email}
                name="email"
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label>Password</Form.Label>
              <Form.Control
                placeholder="Enter Password"
                className="form-control"
                type="password"
                required
                onChange={OnChange}
                value={state.password}
                name="password"
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={(values) => {
                console.log("Success!", values);
              }}
            >
              Submit
            </Button>
            {error.alert && (
              <Alert variant="danger">
                <p>{error.alertMessage}</p>
              </Alert>
            )}
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default LoginPopUp;
