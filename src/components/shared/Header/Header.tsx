import { NavLink } from "react-router-dom";
import { Badge, Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import styles from "./styles.module.css";
import HeaderLeftBar from "@components/shared/Header/headerLeftBar/HeaderLeftBar";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { authLogout } from "@store/auth/authslice";
import actGetWishlistProductsByIds from "@store/wishlist/act/actGetWishlistProductsByIds";
import { useEffect } from "react";

const { headerContainer, headerLogo, headerLeftBar } = styles;

const Header = () => {
  const { accessToken, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(actGetWishlistProductsByIds("itemsIds"));
  }, [dispatch, accessToken]);

  return (
    <header>
      <div className={headerContainer}>
        <h1 className={headerLogo}>
          <span>Our</span> <Badge bg="info">eCom</Badge>{" "}
        </h1>
        <div className={headerLeftBar}>
          <HeaderLeftBar />
        </div>
      </div>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container className={headerContainer}>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />{" "}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to={"/"}>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to={"/categories"}>
                Categories
              </Nav.Link>
              <Nav.Link as={NavLink} to="/about-us">
                About
              </Nav.Link>
            </Nav>
            {!accessToken ? (
              <Nav>
                <Nav.Link as={NavLink} to="login">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="register">
                  Register
                </Nav.Link>
              </Nav>
            ) : (
              <NavDropdown
                title={`Welcome: ${user?.firstName} ${user?.lastName}`}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item as={NavLink} to="profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item>Orders</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  as={NavLink}
                  to="/"
                  onClick={() => dispatch(authLogout())}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
