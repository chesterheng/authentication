import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./HeaderStyle.css";

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const { authenticated } = auth;
  const renderLinks = () => {
    if (authenticated) {
      return (
        <div>
          <Link to="/signout">Sign Out</Link>
          <Link to="/feature">Feature</Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/signup">Sign Up</Link>
          <Link to="/signin">Sign In</Link>
        </div>
      );
    }
  };

  return (
    <div className="header">
      <Link to="/">Redux Auth</Link>
      {renderLinks()}
    </div>
  );
};

export default Header;
