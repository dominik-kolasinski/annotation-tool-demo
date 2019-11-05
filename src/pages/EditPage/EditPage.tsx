import React from "react";
import { RouteComponentProps } from "react-router";
import classes from "../../utils/classes";
import WorkbenchTools from "../../components/WorkbenchTools/WorkbenchTools";
import "./EditPage.scss";

const bem = classes("edit-page");

type MyProps = RouteComponentProps<{ id?: string }>;

const EditPage: React.FC<MyProps> = ({ match }) => {
  return (
    <main className={bem()}>
      <WorkbenchTools imageUID={match.params.id as string} />
    </main>
  );
};

export default EditPage;
