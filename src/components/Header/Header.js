import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseItemQuantity,
  decreaseItemQuantity,
  removeItemFromCart,
} from "../../store/cartActions";
import { setSearchQuery } from "../../store/searchActions";
import "./Header.css";
import { loadStripe } from "@stripe/stripe-js";

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

  /*  function handlePay() {
    console.log(cartItems);
    handlePayment();
  } */

  const handlePayment = async () => {
    const stripePromise = await loadStripe(
      "pk_test_51PlQyT07SwF5vSQMlFSz7CcD19lA2tqdbdiGt34iuCwBT1xuKmET9UyGmdVTWdmjT7zq6iN46zdKvt2eibMQkaY800JAmVGm9i"
    );

    //replace this URL with hosted vercel end point
    const response = await fetch(
      "http://localhost:5001/create-checkout-session",
      {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          cartItems: cartItems,
        }),
      }
    );
    const responseData = await response.json();
    console.log(responseData);

    if (responseData?.id) {
      stripePromise.redirectToCheckout({ sessionId: responseData.id });
    }
  };

  return (
    <header className="header">
      <h1>Redux learning</h1>
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
          <div onClick={handlePayment}>PAY</div>
        </div>
      )}
    </header>
  );
};

export default Header;
