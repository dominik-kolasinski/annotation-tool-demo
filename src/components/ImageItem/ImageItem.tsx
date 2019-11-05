import React from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

import classes from "../../utils/classes";
import { Image } from "../../store/images/types";
import "./ImageItem.scss";

const bem = classes("image-item");

interface ImageItemProps {
  image: Image;
}

const ImageItem: React.FC<ImageItemProps> = props => {
  const dispatch = useDispatch();

  return (
    <div className={bem()}>
      <button
        className={bem("edit-button")}
        onClick={() => dispatch(push(`/edit/${props.image.UID}`))}
      >
        edit
      </button>
      <img
        src={props.image.Base64}
        alt={props.image.FileName}
        key={props.image.UID}
        className={bem("img")}
      />
    </div>
  );
};

export default ImageItem;
