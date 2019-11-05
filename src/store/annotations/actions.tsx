import {
  FETCH_ANNOTATIONS,
  ADD_ANNOTATION,
  UPDATE_ANNOTATION,
  Annotation
} from "./types";

export const fetchAnnotations = (imageUID: string) => {
  return {
    type: FETCH_ANNOTATIONS,
    payload: imageUID
  };
};

export const addAnnotation = (annotation: Annotation) => {
  return {
    type: ADD_ANNOTATION,
    payload: annotation
  };
};

export const updateAnnotation = (annotation: Annotation) => {
  return {
    type: UPDATE_ANNOTATION,
    payload: annotation
  };
};
