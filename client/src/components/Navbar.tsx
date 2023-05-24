import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { CartButton } from "./CartButton";
import { HomeLogo } from "./HomeLogo";

export function Navbar() {
  return (
    <header>
      <NavbarBs sticky="top" expand="md" className="header shadow-lg mb-4">
        <Container>
          <NavbarBs.Toggle aria-controls="responsive-navbar-nav" />
          <NavbarBs.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" style={{ alignItems: "center" }}>
              <StyledNavLink to="/" as={NavLink}>
                <HomeLogo />
              </StyledNavLink>
              <StyledNavLink to="/" as={NavLink}>
                Home
              </StyledNavLink>
              <StyledNavLink to="/FAQ" as={NavLink}>
                FAQ
              </StyledNavLink>
            </Nav>
            <Nav style={{ alignItems: "center" }}>
              <Link data-cy="user-link" to="SignInUser" as={NavLink}>
                {/* ändra sökväg till Jennys sida */}
                Sign in
              </Link>
              <Link data-cy="user-link" to="/users" as={NavLink}>
                User
              </Link>
              <Link data-cy="admin-link" to="/admin" as={NavLink}>
                Admin
              </Link>
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
