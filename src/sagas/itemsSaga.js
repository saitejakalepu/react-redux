import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  fetchItemsRequest,
  fetchItemsSuccess,
  fetchItemsFailure,
} from "../store/itemsActions";

function productsFetch() {
  return fetch("https://fakestoreapi.com/products").then((resp) => resp.json());
}

function* fetchItemsSaga() {
  yield put(fetchItemsRequest());
  try {
    //https://redux-saga.js.org/docs/basics/DispatchingActions
    //const response = yield call(productsFetch);
    const response = yield call(axios.get, "https://fakestoreapi.com/products");
    console.log(response);
    yield put(fetchItemsSuccess(response.data));
  } catch (error) {
    yield put(fetchItemsFailure(error.message));
  }
}

export function* myFetchItemsSaga() {
  yield takeEvery("FETCH_ITEMS", fetchItemsSaga);
}

/*function* syntax is used to define a generator function. Generator functions, indicated by the * after function, work differently than regular functions in JavaScript. They allow you to yield values at different steps in a function, which is essential in Redux Saga for handling asynchronous side effects in a linear and controlled manner. */
