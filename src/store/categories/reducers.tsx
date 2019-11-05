import { AppActionTypes, ADD_CATEGORY, Category } from "./types";

const initialState: Category[] = [
  { UID: "1", color: "red", name: "red" },
  { UID: "2", color: "yellowgreen", name: "yellowgreen" },
  { UID: "3", color: "slateblue", name: "slateblue" }
];

export const categoriesReducer = (
  state = initialState,
  action: AppActionTypes
): Category[] => {
  switch (action.type) {
    case ADD_CATEGORY:
      return [...state.concat(action.payload)];
    default:
      return state;
  }
};
