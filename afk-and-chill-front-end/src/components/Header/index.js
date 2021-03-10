import React from "react";
import PersonIcon from "@material-ui/icons/Person";
import { Auth } from "aws-amplify";
import { Navbar, Nav } from "react-bootstrap";
import { Link, NavLink, useHistory } from "react-router-dom";

const Header = () => {
    return (
        <Navbar expand="lg">
            <section>
                <Navbar.Brand>
                    <h1>AFK & CHILL</h1>
                </Navbar.Brand>
                <h1>LOGOUT</h1>
                <PersonIcon />
            </section>
            <Nav className="">
                <NavLink to="/chillers" className="px-2">
                    Find Chillers
                </NavLink>
                <NavLink to="/posts" className="px-2">
                    Chiller's Posts
                </NavLink>
                <NavLink to="/chat" className="px-2">
                    AFK chat
                </NavLink>
            </Nav>
        </Navbar>
    );
};

export default Header;
