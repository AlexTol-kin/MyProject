import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import {
  userReducer,
  productReducer,
  appReducer,
  orderReducer,
} from "./reducers";

const reducer = combineReducers({
  app: appReducer,
  user: userReducer,
  product: productReducer,
  order: orderReducer,
});

const composeEnhanqers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducer,
  composeEnhanqers(applyMiddleware(thunk))
);
