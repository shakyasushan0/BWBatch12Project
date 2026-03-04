import { Nav, Navbar, Container, Badge, NavDropdown } from "react-bootstrap";
import logo from "../assets/react.svg";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { clearCredentials } from "../slices/authSlice";

function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [logout, {}] = useLogoutMutation();
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      const res = await logout().unwrap();
      dispatch(clearCredentials());
      navigate("/signin");
      console.log(res.message);
    } catch (err) {
      console.log(err?.data?.error);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            <img src={logo} />
            Broadway
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="nav-bar" />
          <Navbar.Collapse id="nav-bar">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/cart">
                <FaShoppingCart /> Cart{" "}
                {cartItems.length > 0 && (
                  <Badge bg="success" pill>
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </Badge>
                )}
              </Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name}>
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={NavLink} to="/signin">
                  <FaUser /> Signin
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
