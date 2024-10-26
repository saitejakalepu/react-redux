export const addItemToCart = (item) => {
    return {
      type: 'ADD_ITEM_TO_CART',
      payload: item,
    };
  };
  
  export const increaseItemQuantity = (id) => {
    return {
      type: 'INCREASE_ITEM_QUANTITY',
      payload: id,
    };
  };
  
  export const decreaseItemQuantity = (id) => {
    return {
      type: 'DECREASE_ITEM_QUANTITY',
      payload: id,
    };
  };
  
  export const removeItemFromCart = (id) => {
    return {
      type: 'REMOVE_ITEM_FROM_CART',
      payload: id,
    };
  };
  