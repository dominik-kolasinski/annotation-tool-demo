import React from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import classes from "../../utils/classes";
import "./NotFoundPage.scss";

const bem = classes("not-found-page");

const NotFoundPage: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <main className={bem()}>
      <span>page not found!</span>
      <span className={bem("link")} onClick={() => dispatch(push("/"))}>
        go back to homepage
      </span>
    </main>
  );
};

export default NotFoundPage;
