import {
  FETCH_IMAGES,
  GET_IMAGE,
  ADD_IMAGE,
  DELETE_IMAGE,
  Image
} from "./types";

export const fetchImages = () => {
  return {
    type: FETCH_IMAGES
  };
};

export const getImage = (uid: string) => {
  return {
    type: GET_IMAGE,
    payload: uid
  };
};

export const addImage = (image: Image) => {
  return {
    type: ADD_IMAGE,
    payload: image
  };
};

export const deleteImage = (uid: string) => {
  return {
    type: DELETE_IMAGE,
    payload: uid
  };
};
