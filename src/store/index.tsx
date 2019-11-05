import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import { save, load } from "redux-localstorage-simple";
import createRootReducer from "./rootReducer";

export const history = createBrowserHistory();

const middleware = [routerMiddleware(history), save()];

export default function configureStore() {
  const composeEnhancer: typeof compose =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    createRootReducer(history),
    load(),
    composeEnhancer(applyMiddleware(...middleware))
  );

  return store;
}
