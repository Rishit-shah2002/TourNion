import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import Button from "react-bootstrap/Button";
import { searchTours } from "../redux/features/tourSlice";
import { Link, useNavigate } from "react-router-dom";
import decode from "jwt-decode";

const Header = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = user?.token;

  // this is for checking if the token is expired or not
  if (token) {
    const decodeToken = decode(token);
    if (decodeToken * 1000 < new Date().getTime()) {
      dispatch(setLogout());
    }
  }

  const handleLogout = () => {
    dispatch(setLogout());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(searchTours(search));
      navigate(`/tours/search?searchQuery=${search}`);
      // handleClear();
    } else {
      navigate("/");
    }
  };
  const handleClear = () => {
    setSearch("");
  };
  return (
    <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: "#f0e6ea" }}>
      <MDBContainer>
        <MDBNavbarBrand
          href="/"
          style={{ color: "#606080", fontWeight: "600", fontSize: "22px" }}
        >
          TourNion
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toogle navigation"
          onClick={() => setShow(!show)}
          style={{ color: "#606080" }}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar>
          <form
            style={{
              marginTop: "5px",
              alignContent: "center",
            }}
            className="d-flex input-group w-auto"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Search Tour"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ marginLeft: "5px" }}
            />
            {/* <Button
              style={{ marginLeft: "4px" }}
              variant="danger"
              onClick={handleSubmit}
            >
              Submit
            </Button> */}
            <Button
              style={{ marginLeft: "4px" }}
              variant="danger"
              onClick={handleClear}
            >
              Clear
            </Button>
          </form>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            {user?.result?._id && (
              <h5 style={{ marginRight: "30px", marginTop: "28px" }}>
                Logged in as: <Link to={`/user/${user.result._id}`}>{user?.result?.name}</Link>
              </h5>
            )}
            <MDBNavbarItem>
              <MDBNavbarLink href="/">
                <p className="header-text">Home</p>
              </MDBNavbarLink>
            </MDBNavbarItem>
            {user && user.result && user.result._id && (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/addTour">
                    <p className="header-text">Add Tour</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/dashboard">
                    <p className="header-text">Dashboard</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href={`/user/${user.result._id}`}>
                    <p className="header-text"><img
                      src={`https://avatars.dicebear.com/api/gridy/${user?.result?.name}.svg`}
                      width="25"
                      height="25"
                      alt="avatar"
                      class="rounded-circle"
                    /></p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}
            {user && user.result && user.result._id ? (
              <MDBNavbarItem>
                <MDBNavbarLink>
                  <p className="header-text" onClick={handleLogout}>
                    Logout
                  </p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            ) : (
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <p className="header-text">Login</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
