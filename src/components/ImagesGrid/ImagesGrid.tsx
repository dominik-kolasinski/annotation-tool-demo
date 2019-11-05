import React from "react";
import { useSelector } from "react-redux";
import { Image } from "../../store/images/types";
import { AppState } from "../../store/rootReducer";

import ImageItem from "../ImageItem/ImageItem";
import classes from "../../utils/classes";
import "./ImagesGrid.scss";

const bem = classes("images-grid");

const ImagesGrid: React.FC = () => {
  const images = useSelector((state: AppState) => state.images);
  return (
    <section className={bem()}>
      {images.map((image: Image) => (
        <ImageItem image={image} key={image.UID} />
      ))}
    </section>
  );
};

export default ImagesGrid;
