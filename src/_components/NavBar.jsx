import React from "react";
import { Link } from "react-router-dom";
import { useAppState } from "../context";

import Button from "react-bootstrap/Button";
import { Popover, OverlayTrigger } from "react-bootstrap";
import LoginPopup from "../LoginPage/Login";

function NavBar(props) {
  const { appState, logout } = useAppState();

  const [modalShow, setModalShow] = React.useState(false);

  const ManageModel = () => {
    setModalShow(!modalShow);
  };

  return (
    <nav className="navbar navbar-dark bg-primary fixed-top">
      <Link className="navbar-brand" to="/">
        Q&App
      </Link>
      {appState.isAuthenticated ? (
        <div>
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={
              <Popover id="popover-positioned-bottom">
                <Popover.Title as="h3">{appState.user}</Popover.Title>
                <Popover.Content>
                  <Button onClick={logout}>Logout</Button>
                </Popover.Content>
              </Popover>
            }
            rootClose
          >
            <Button>
              <img
                src="https://img.icons8.com/ios/50/000000/cool.png"
                width="30"
                height="30"
                alt="profile.png"
              />
            </Button>
          </OverlayTrigger>
        </div>
      ) : (
        <div>
          <>
            <Button
              variant="light"
              style={{ marginRight: "25px" }}
              onClick={ManageModel}
            >
              Log In
            </Button>{" "}
            <LoginPopup show={modalShow} onHide={ManageModel} />
          </>
          <Button variant="light">Sign Up</Button>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
