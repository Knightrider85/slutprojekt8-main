import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { CartButton } from "./CartButton";
import { HomeLogo } from "./HomeLogo";
import { LoginButton } from "./LoginButton";

export function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch("/api/checkSignedIn")
      .then((response) => response.json())
      .then((data) => {
        setLoggedIn(data.isSignedIn);
      })
      .catch((error) =>
        console.log("Error checking if a user is logged in", error)
      );

    fetch("/api/checkAdmin")
      .then((response) => response.json())
      .then((data) => setIsAdmin(data.isAdmin))
      .catch((error) => console.error("Error checking admin:", error));
  }, []);

  const handleSignOut = () => {
    setLoggedIn(false);
  };

  return (
    <header>
      <NavbarBs sticky="top" expand="md" className="header shadow-lg mb-4">
        <Container>
          <NavbarBs.Toggle aria-controls="responsive-navbar-nav" />
          <NavbarBs.Collapse id="responsive-navbar-nav">
            <NavWrapper className="me-auto" style={{ alignItems: "center" }}>
              <StyledNavLink to="/" as={NavLink}>
                <HomeLogo />
              </StyledNavLink>
              <StyledNavLink to="/" as={NavLink}>
                Home
              </StyledNavLink>
              <StyledNavLink to="/FAQ" as={NavLink}>
                FAQ
              </StyledNavLink>
            </NavWrapper>
            <Nav style={{ alignItems: "center" }}>
              <Link data-cy="user-link" to="/login" as={NavLink}>
                <LoginButton loggedIn={loggedIn} onSignOut={handleSignOut} />
              </Link>
              <Link data-cy="user-link" to="/users" as={NavLink}>
                Create User
              </Link>

              {loggedIn && isAdmin ? (
                <Link data-cy="admin-link" to="/admin" as={NavLink}>
                  Admin
                </Link>
              ) : null}

              <CartButton />
            </Nav>
          </NavbarBs.Collapse>
        </Container>
      </NavbarBs>
    </header>
  );
}

const StyledNavLink = styled(NavLink)`
  padding: 0px 10px;
  color: black;
  text-decoration: none;
  font-size: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    color: #9d9d9d;
    text-decoration: underline 3px;
  }
  &.active {
    color: black;
    text-decoration: underline 3px;
  }
`;

const Link = styled(NavLink)`
  padding: 0px 10px;
  text-decoration: none;
  color: black;
  transition: all 0.3s ease;
  &:hover {
    color: #9d9d9d;
    text-decoration: underline 3px;
  }
`;

const NavWrapper = styled(Nav)`
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
    margin-top: 10px;
  }
`;
