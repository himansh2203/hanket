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

  // 🧮 TOTAL PRICE CALCULATION
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );

  if (cartItems.length === 0) {
    return <h2 className="empty-cart">🛒 Cart is empty</h2>;
  }

  return (
    <div className="cart-page">
      <h2>🛒 My Cart</h2>
      {cartItems.map((item) => (
        <div key={item.product.id} className="cart-item">
          {/* LEFT */}
          <div>
            <h4>{item.product.name}</h4>
            <p>₹{item.product.price}</p>

            {/* 🔢 QTY CONTROLS */}
            <div className="qty-box">
              <button onClick={() => dispatch(decrementQty(item.product.id))}>
                -
              </button>
              <span>{item.qty}</span>
              <button onClick={() => dispatch(incrementQty(item.product.id))}>
                +
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="cart-right">
            {/* 💰 ITEM TOTAL */}
            <p className="item-total">₹{item.product.price * item.qty}</p>

            <button
              className="remove-btn"
              onClick={() => dispatch(removeFromCart(item.product.id))}
            >
              ❌ Remove
            </button>
          </div>
        </div>
      ))}
      {/* 💰 GRAND TOTAL */}
      <h3 className="cart-total">Total Amount: ₹{totalAmount.toFixed(2)}</h3>
      <button
        className="total-btn"
        style={{
          marginTop: "10px",
          background: "red",
          color: "#fff",
          padding: "8px 12px",
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => dispatch(clearCart())}
      >
        Clear Cart
      </button>
    </div>
  );
};

export default Cart;
