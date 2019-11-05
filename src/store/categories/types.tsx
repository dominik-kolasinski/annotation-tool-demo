export const ADD_CATEGORY = "ADD_CATEGORY";

interface AddCategoryAction {
  type: typeof ADD_CATEGORY;
  payload: Category;
}

export interface Category {
  UID?: string;
  color: string;
  name: string;
}

export type AppActionTypes = AddCategoryAction;
