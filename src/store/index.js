import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import rootSaga from "../sagas/rootSaga";
import createSagaMiddleware from "redux-saga";
import cartReducer from "./cartReducer";
import searchReducer from "./searchReducer";
import { thunk } from "redux-thunk";
import itemsReducer from "./itemsReducer";

const sagaMiddleware = createSagaMiddleware();

const loggerMiddleware = (store) => (next) => (action) => {
  console.log("Prev state:", store.getState());
  console.log("Dispatching action:", action);
  let result = next(action);
  console.log("Next state:", store.getState());
  return result;
};
const rootReducer = combineReducers({
  cart: cartReducer,
  search: searchReducer,
  myitems: itemsReducer,
});
export const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, loggerMiddleware)
);
sagaMiddleware.run(rootSaga);
