import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseItemQuantity,
  decreaseItemQuantity,
  removeItemFromCart,
} from "../store/cartSlice";
import { setSearchQuery } from "../store/searchSlice";
import "./Header.css";

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const searchQuery = useSelector((state) => state.search.searchQuery); // Use search query from search reducer
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <header className="header">
      <h1>Redux Toolkit</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <div className="cart">
        <span onClick={handleCartToggle}>Cart: {totalQuantity}</span>
      </div>
      {isCartOpen && (
        <div className="cart-popup">
          <h2>Cart Items</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-item-image"
                />
                <span>{item.title}</span>
                <span>${item.price}</span>
                <div className="cart-item-quantity">
                  <button
                    onClick={() => dispatch(decreaseItemQuantity(item.id))}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => dispatch(increaseItemQuantity(item.id))}
                  >
                    +
                  </button>
                </div>
                <button onClick={() => dispatch(removeItemFromCart(item.id))}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <span>Total Price: ${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
