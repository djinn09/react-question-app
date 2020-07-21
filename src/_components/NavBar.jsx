import React from "react";
import { Link } from "react-router-dom";
import { useAppState } from "../context";

import Button from "react-bootstrap/Button";
import { Popover, OverlayTrigger } from "react-bootstrap";
import LoginPopup from "../LoginPage/Login";

function NavBar(props) {
  const { appState } = useAppState();

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
                <Popover.Title as="h3">{`Popover placement`}</Popover.Title>
                <Popover.Content>
                  <strong>Holy guacamole!</strong> Check this info.
                </Popover.Content>
              </Popover>
            }
          >
            <button>
              <img
                src="https://img.icons8.com/ios/50/000000/cool.png"
                alt="profile.png"
              />
            </button>
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
