import React from "react";
import "./header.scss";

const Header: React.FunctionComponent = () => {
  return (
    <header className="header">
      <h1 className="header__title">Crypto Hunter</h1>
      <button className="header__login">LOGIN</button>
    </header>
  );
};

export default Header;
