import headerLogo from "../images/logo.svg";
import React from "react";
import { Link, Route, Switch } from "react-router-dom";

function Header({ handleLogout, currentUser }) {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
      <div className="header__menu">
        <Route exact path="/users/me">
          <p className="header__user-email">{currentUser.email}</p>
        </Route>
        <Switch>
          <Route path="/signin">
            <Link to="/signup" className="header__link">
              Registration
            </Link>
          </Route>
          <Route path="/signup">
            <Link to="/signin" className="header__link">
              Login
            </Link>
          </Route>
          <Route path="/users/me">
            <Link
              to="/signin"
              className="header__link header__link_logout"
              onClick={handleLogout}
            >
              Logout
            </Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
