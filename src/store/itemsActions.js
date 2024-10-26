import axios from "axios";

export const fetchItems = () => {
  return {
    type: "FETCH_ITEMS", // action to trigger Saga
  };
};

export const fetchItemsRequest = () => {
  return {
    type: "FETCH_ITEMS_REQUEST",
  };
};

export const fetchItemsSuccess = (items) => {
  return {
    type: "FETCH_ITEMS_SUCCESS",
    payload: items,
  };
};

export const fetchItemsFailure = (error) => {
  return {
    type: "FETCH_ITEMS_FAILURE",
    payload: error,
  };
};

/* export const fetchItems = () => {
  return (dispatch) => {
    dispatch(fetchItemsRequest());
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        const items = response.data;
        dispatch(fetchItemsSuccess(items));
      })
      .catch((error) => {
        dispatch(fetchItemsFailure(error.message));
      });
  };
}; */
