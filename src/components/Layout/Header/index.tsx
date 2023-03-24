import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";

const Header: React.FunctionComponent = () => {
  return (
    <header className="header">
      <Link className="header__title" to="/">
        Crypto Hunter
      </Link>
      <button className="header__login">LOGIN</button>
    </header>
  );
};

export default Header;
