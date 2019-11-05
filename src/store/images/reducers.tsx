import {
  AppActionTypes,
  FETCH_IMAGES,
  GET_IMAGE,
  ADD_IMAGE,
  DELETE_IMAGE,
  Image
} from "./types";

import { defaultImages } from "../../assets/defaultImages.js";

const initialState: Image[] = defaultImages;

export const imagesReducer = (
  state = initialState,
  action: AppActionTypes
): Image[] => {
  switch (action.type) {
    case FETCH_IMAGES:
      return [...state.concat(defaultImages)];
    case GET_IMAGE:
      return state.filter(image => image.UID === action.payload);
    case ADD_IMAGE:
      return [...state.concat(action.payload)];
    case DELETE_IMAGE:
      return [...state.filter((image: Image) => image.UID !== action.payload)];
    default:
      return state;
  }
};
