const initialState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_ITEM_TO_CART':
        const newItem = action.payload;
        const existingItem = state.items.find(item => item.id === newItem.id);
        let cartItems;
  
        if (existingItem) {
          cartItems = state.items.map(item =>
            item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          cartItems = [...state.items, { ...newItem, quantity: 1 }];
        }
  
        return {
          ...state,
          items: cartItems,
          totalQuantity: state.totalQuantity + 1,
          totalPrice: state.totalPrice + newItem.price,
        };
  
      case 'INCREASE_ITEM_QUANTITY':
        const increasedItems = state.items.map(item =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        );
  
        return {
          ...state,
          items: increasedItems,
          totalQuantity: state.totalQuantity + 1,
          totalPrice: state.totalPrice + state.items.find(item => item.id === action.payload).price,
        };
  
      case 'DECREASE_ITEM_QUANTITY':
        const itemToDecrease = state.items.find(item => item.id === action.payload);
        let decreasedItems;
        if (itemToDecrease.quantity === 1) {
          decreasedItems = state.items.filter(item => item.id !== action.payload);
        } else {
          decreasedItems = state.items.map(item =>
            item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
          );
        }
  
        return {
          ...state,
          items: decreasedItems,
          totalQuantity: state.totalQuantity - 1,
          totalPrice: state.totalPrice - itemToDecrease.price,
        };
  
      case 'REMOVE_ITEM_FROM_CART':
        const itemToRemove = state.items.find(item => item.id === action.payload);
        let updatedItems = state.items.filter(item => item.id !== action.payload);
  
        return {
          ...state,
          items: updatedItems,
          totalQuantity: state.totalQuantity - itemToRemove.quantity,
          totalPrice: state.totalPrice - (itemToRemove.price * itemToRemove.quantity),
        };
  
      default:
        return state;
    }
  };
  
  export default cartReducer;
  