import React from "react";
import { Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavbarApp = () => {
  return (
    <Navbar
      bg="light"
      expand="lg"
      style={{ display: "flex", justifyContent: "space-around" }}
    >
      <Navbar.Brand href="/">React-Apollo-Crud</Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <Link to="/createuser">
          <Button variant="outline-success">Create User</Button>
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
