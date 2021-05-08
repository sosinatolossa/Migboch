import React, { useState, useContext } from "react";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { UserContext } from "././user/UserProvider";

export default function Header() {
    const { isLoggedIn, logout } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="light" light expand="md">
                <Navbar.Brand to="/">
                    Ye Migbe Keeper
                </Navbar.Brand>
                <Navbar.Toggle onClick={toggle} />
                <Navbar.Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>

                        {/* When isLoggedIn === true, we will render the Home link */}
                        {isLoggedIn && (
                            <>
                                <Nav.Item>
                                    <Nav.Link href="/">
                                        Home
                                    </Nav.Link>
                                </Nav.Item>
                            </>
                        )}
                    </Nav>

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
                    <Nav navbar>
                        {isLoggedIn && (
                            <>
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

                            </>
                        )}

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
