import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { AdminButton } from "./AdminButton";
import { CartButton } from "./CartButton";
import { HomeLogo } from "./HomeLogo";
import { LoginButton } from "./LoginButton";
import { UserButton } from "./UserButton";

export function Navbar() {
  return (
    <header>
      <NavbarBs sticky="top" className="header shadow-lg mb-4">
        <Container>
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
          <Link data-cy="user-link" to="/login" as={NavLink}>
            <LoginButton />
          </Link>
          <Link data-cy="user-link" to="/users" as={NavLink}>
            <UserButton />
          </Link>
          <Link data-cy="admin-link" to="/admin" as={NavLink}>
            <AdminButton />
          </Link>
          {/* <Link data-cy="user-link" to="/checkout" as={NavLink}> */}
          <CartButton />
          {/* </Link> */}
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
  &.active {
    color: black;
    text-decoration: underline 3px;
  }
`;

const Link = styled(NavLink)`
  padding: 0px 10px;
`;
