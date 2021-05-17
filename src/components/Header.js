import React from "react";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import logo from "../assets/logo.png";

const Header = ({ setData, setSearchCom, setSearchChar, token, setToken }) => {
  const history = useHistory();

  return (
    <div className="header">
      <div>
        <img alt="logo" src={logo} />
        <ul>
          <li
            onClick={() => {
              setSearchCom("");
              setSearchChar("");
              setData([]);
            }}
          >
            <Link to="/">Characters</Link>
          </li>
          <li
            onClick={() => {
              setData([]);
              setSearchCom("");
              setSearchChar("");
            }}
          >
            <Link to="/comics">Comics</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
        </ul>
      </div>
      <div className="log-sign">
        {!token ? (
          <Link to="/login">Login</Link>
        ) : (
          <span
            onClick={() => {
              setToken(null);
              Cookies.remove("token");
              Cookies.remove("username");
              history.push("/");
            }}
          >
            Logout
          </span>
        )}

        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
};

export default Header;
