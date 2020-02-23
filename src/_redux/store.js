import { createStore, compose, applyMiddleware } from "redux";
import { default as reduxThunk } from "redux-thunk";
import { createBrowserHistory } from "history";
import api from "../_components/Api";
import rootReducer from "./reducers/rootReducer";

const initialState = {};

export const history = createBrowserHistory();

const middleware = [reduxThunk.withExtraArgument({ api })].filter(Boolean);

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleware))
);

export default store;
