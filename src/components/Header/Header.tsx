import React from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import classes from "../../utils/classes";
import "./Header.scss";

const bem = classes("header");

const Header: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <header className={bem()}>
      <h1 className={bem("title")} onClick={() => dispatch(push("/"))}>
        annotation tool demo
      </h1>
    </header>
  );
};

export default Header;
