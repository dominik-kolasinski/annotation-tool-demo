import { combineReducers } from "redux";
import { History } from "history";
import { connectRouter } from "connected-react-router";

import { Image } from "./images/types";
import { Annotation } from "./annotations/types";
import { Category } from "./categories/types";
import { imagesReducer } from "./images/reducers";
import { annotationsReducer } from "./annotations/reducers";
import { categoriesReducer } from "./categories/reducers";

export interface AppState {
  router: any;
  images: Image[];
  annotations: Annotation[];
  categories: Category[];
}

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    images: imagesReducer,
    annotations: annotationsReducer,
    categories: categoriesReducer
  });

export default createRootReducer;
