import { all } from "redux-saga/effects";
import { myFetchItemsSaga } from "./itemsSaga";

export default function* rootSaga() {
  yield all([
    myFetchItemsSaga(),
    // we can add other sagas here based on our needs
  ]);
}
