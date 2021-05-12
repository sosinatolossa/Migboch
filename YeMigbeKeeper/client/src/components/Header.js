import userEvent from "@testing-library/user-event";
import React, { useState, useContext } from "react";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { UserContext } from "././user/UserProvider";

export default function Header() {
    const { isLoggedIn, logout } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    let currentUser = JSON.parse(sessionStorage.getItem("User"));

    return (
        <div>
            <Navbar bg="warning" variant="light" light expand="md">
                <Navbar.Brand href="/">
                    Ye Migbe Keeper
                </Navbar.Brand>
                <Navbar.Toggle onClick={toggle} />
                <Navbar.Collapse isOpen={isOpen} navbar>


                    <Nav className="mr-auto" navbar>
                        {/* When isLoggedIn === true, we will render the Posts link */}
                        {isLoggedIn && (
                            <Nav.Item>
                                <Nav.Link href="/habeshaFood">
                                    Habesha Foods
                                </Nav.Link>
                            </Nav.Item>
                        )}
                    </Nav>

                    <Nav className="mr-auto" navbar>
                        {/* When isLoggedIn === true, we will render the My Posts link */}
                        {isLoggedIn && (
                            <Nav.Item>
                                <Nav.Link href="/myHabeshaFoods">
                                    My Habesha Foods
                                </Nav.Link>
                            </Nav.Item>
                        )}
                    </Nav>

                    <Nav className="mr-auto" navbar>
                        {isLoggedIn && (
                            <Nav.Item>
                                <Nav.Link href="/favoriteFood">
                                    My Favorite Habesha Foods
                                </Nav.Link>
                            </Nav.Item>
                        )}
                    </Nav>
                    <Nav className="mr-auto" navbar>
                        {isLoggedIn && (
                            <Nav.Item>
                                <Nav.Link href="/recipe">
                                    Recipes
                                </Nav.Link>
                            </Nav.Item>
                        )}
                    </Nav>

                    <Nav className="mr-auto" navbar>
                        {isLoggedIn && (
                            <NavDropdown title={`Signed in as ${currentUser.firstName} ${currentUser.lastName}`} className="justify-content-end">
                                <NavDropdown.Item href="#action/3.1">
                                    <Nav.Item>
                                        <a
                                            aria-current="page"
                                            className="nav-link"
                                            style={{ cursor: "pointer" }}
                                            onClick={logout}
                                        >
                                            Logout
                                </a>
                                    </Nav.Item>
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}

                    </Nav>

                    <Nav navbar>
                        {!isLoggedIn && (
                            <>
                                <Nav.Item>
                                    <Nav.Link href="/login">
                                        Login
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/register">
                                        Register
                                    </Nav.Link>
                                </Nav.Item>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar >
        </div >
    );
}
