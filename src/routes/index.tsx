import React from "react";
import { Route, Switch } from "react-router";
import SelectPage from "../pages/SelectPage/SelectPage";
import EditPage from "../pages/EditPage/EditPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

const routes = (
  <Switch>
    <Route exact path="/" component={SelectPage} />
    <Route path="/edit/:id" component={EditPage} />
    <Route path="*" component={NotFoundPage} />
  </Switch>
);

export default routes;
