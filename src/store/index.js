import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";

import cartReducer from "./cartReducer";
import searchReducer from "./searchReducer";
import { thunk } from "redux-thunk";
import itemsReducer from "./itemsReducer";

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
  applyMiddleware(thunk)
);

