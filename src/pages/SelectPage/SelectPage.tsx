import React from "react";
import classes from "../../utils/classes";
import "./SelectPage.scss";
import FileUpload from "../../components/FileUpload/FileUpload";
import ImagesGrid from "../../components/ImagesGrid/ImagesGrid";

const bem = classes("select-page");

const SelectPage: React.FC = () => {
  return (
    <main className={bem()}>
      <ImagesGrid />
      <FileUpload />
    </main>
  );
};

export default SelectPage;
