import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementQty,
  decrementQty,
  clearCart,
} from "../redux/cartSlice";
import "../style/Cart.css";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );

  if (cartItems.length === 0) {
    return <h2 className="empty-cart">🛒 Your cart is empty</h2>;
  }

  const handleCheckout = () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY",
      amount: totalAmount * 100,
      currency: "INR",
      name: "Hanket Store",
      description: "Purchase",
      handler: function (response) {
        alert(
          `Payment Successful! Payment ID: ${response.razorpay_payment_id}`
        );
        dispatch(clearCart());
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9999999999",
      },
      theme: { color: "#F37254" },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="cart-page">
      <h2>🛒 My Cart</h2>

      <div className="cart-items-container">
        {cartItems.map((item) => (
          <div key={item.product.id} className="cart-item">
            {/* PRODUCT IMAGE */}
            <div className="item-image">
              <img
                src={item.product.image || "default.png"}
                alt={item.product.name}
              />
            </div>

            <div className="item-info">
              <h4>{item.product.name}</h4>
              <p>₹{item.product.price}</p>
            </div>

            <div className="qty-box">
              <button onClick={() => dispatch(decrementQty(item.product.id))}>
                -
              </button>
              <span>{item.qty}</span>
              <button onClick={() => dispatch(incrementQty(item.product.id))}>
                +
              </button>
            </div>

            <div className="item-total">
              ₹{(item.product.price * item.qty).toFixed(2)}
            </div>

            <button
              className="remove-btn"
              onClick={() => dispatch(removeFromCart(item.product.id))}
            >
              ❌
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total: ₹{totalAmount.toFixed(2)}</h3>
        <button className="checkout-button" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
        <button className="clear-btn" onClick={() => dispatch(clearCart())}>
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
