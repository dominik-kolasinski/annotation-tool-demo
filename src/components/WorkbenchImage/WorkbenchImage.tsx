import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import classes from "../../utils/classes";
import { Image } from "../../store/images/types";
import { AppState } from "../../store/rootReducer";
import "./WorkbenchImage.scss";

const bem = classes("workbench-image");

interface WorkbenchImageProps {
  imageUID: string;
}

const WorkbenchImage: React.FC<WorkbenchImageProps> = ({
  imageUID,
  children
}) => {
  const images = useSelector((state: AppState) => state.images);
  const [currentImage, setCurrentImage] = useState({} as Image);

  useEffect(() => {
    setCurrentImage(images.filter(image => image.UID === imageUID)[0]);
  }, [imageUID, images]);

  return (
    <section className={bem()}>
      <h2 className={bem("title")}>
        currently editing{" "}
        <span className={bem("filename")}>{currentImage.FileName}</span>
      </h2>
      <img
        src={currentImage.Base64}
        alt={currentImage.FileName}
        className={bem("image")}
        draggable={false}
      />
      {children}
    </section>
  );
};

export default WorkbenchImage;
