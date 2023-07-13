import { Box, AppBar } from "@mui/material";

import { useContext } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";

export const Navbar = () => {
  const location = useLocation();
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    setUser(null);
  };

  return (
    <Box display="flex">
      <Link to={`/dashboard/${user._id}`} style={{ textDecoration: "none" }}>
        <h3 variant="h4" className="navbar-main-text">
          Compendex
        </h3>
      </Link>
      <Box display="flex" ml="auto" className="right-navbar">
        <Link
          to={`/user/${user._id}`}
          className={`navbar-links`}
          style={{ textDecoration: "none", marginRight: "3vh" }}
        >
          User Management
        </Link>
        <Link
          to={`/profile/${user._id}`}
          className={`navbar-links`} 
          style={{ textDecoration: "none" }}
        >
          My profile
        </Link>
        <button className="navbar-signout">
          <Link
            to={`/`}
            style={{ textDecoration: "none" }}
            onClick={handleSignOut}
          >
            <p className="navbar-signout-text">Sign Out</p>
          </Link>

          {/* BUG: navbar doesnt rerender after sign out */}
        </button>
      </Box>

      <Outlet />
    </Box>
  );
};