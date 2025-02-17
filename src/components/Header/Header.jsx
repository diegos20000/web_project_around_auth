import React from "react";
import Logo from "../../images/Vector.jpg";

const Header = () => {
  return (
    <header className="header">
      <p className="header__title">
        <img src={Logo} alt="Around The U.S." />
      </p>
      <hr className="header__hr" />
    </header>
  );
};

export default Header;
