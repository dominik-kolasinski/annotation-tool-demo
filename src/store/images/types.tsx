export const FETCH_IMAGES = "FETCH_IMAGES";
export const GET_IMAGE = "GET_IMAGE";
export const ADD_IMAGE = "ADD_IMAGE";
export const DELETE_IMAGE = "DELETE_IMAGE";

interface FetchImagesAction {
  type: typeof FETCH_IMAGES;
}

interface GetImageAction {
  type: typeof GET_IMAGE;
  payload: string;
}

interface AddImageAction {
  type: typeof ADD_IMAGE;
  payload: any;
}

interface DeleteImageAction {
  type: typeof DELETE_IMAGE;
  payload: string;
}

export interface Image {
  FileName: string;
  Base64: string;
  UID?: string;
}

export type AppActionTypes =
  | GetImageAction
  | FetchImagesAction
  | AddImageAction
  | DeleteImageAction;
