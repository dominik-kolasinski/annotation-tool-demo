import {
  AppActionTypes,
  FETCH_ANNOTATIONS,
  ADD_ANNOTATION,
  UPDATE_ANNOTATION,
  Annotation
} from "./types";

const initialState: Annotation[] = [];

export const annotationsReducer = (
  state = initialState,
  action: AppActionTypes
): Annotation[] => {
  switch (action.type) {
    case FETCH_ANNOTATIONS:
      return state.filter(annotation => annotation.imageUID === action.payload);
    case ADD_ANNOTATION:
      return [...state.concat(action.payload)];

    case UPDATE_ANNOTATION:
      const updatedAnnotations = state.map(annotation => {
        if (annotation.UID === action.payload.UID) {
          return action.payload;
        }
        return annotation;
      });
      return updatedAnnotations;
    default:
      return state;
  }
};
