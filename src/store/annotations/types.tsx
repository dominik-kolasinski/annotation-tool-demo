export const FETCH_ANNOTATIONS = "FETCH_ANNOTATIONS";
export const ADD_ANNOTATION = "ADD_ANNOTATION";
export const UPDATE_ANNOTATION = "UPDATE_ANNOTATION";

interface FetchAnnotationsAction {
  type: typeof FETCH_ANNOTATIONS;
  payload: string;
}

interface AddAnnotationAction {
  type: typeof ADD_ANNOTATION;
  payload: Annotation;
}
interface UpdateAnnotationAction {
  type: typeof UPDATE_ANNOTATION;
  payload: Annotation;
}

export interface Annotation {
  UID: string;
  imageUID: string;
  type: string;
  width?: number;
  height?: number;
  posX?: number;
  posY?: number;
  categoryUID?: string;
}

export type AppActionTypes =
  | FetchAnnotationsAction
  | AddAnnotationAction
  | UpdateAnnotationAction;
