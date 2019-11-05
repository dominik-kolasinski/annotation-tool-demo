import { ADD_CATEGORY, Category } from "./types";

export const addCategory = (category: Category) => {
  return {
    type: ADD_CATEGORY,
    payload: category
  };
};
