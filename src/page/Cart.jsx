import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementQty,
  decrementQty,
  clearCart,
} from "../redux/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // 🧮 TOTAL PRICE CALCULATION
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );

  if (cartItems.length === 0) {
    return <h2 style={{ padding: "20px" }}>🛒 Cart is empty</h2>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
      <h2>🛒 My Cart</h2>

      {cartItems.map((item) => (
        <div
          key={item.product.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
            borderBottom: "1px solid #ddd",
            paddingBottom: "10px",
          }}
        >
          <div>
            <h4>{item.product.name}</h4>
            <p>Price: ₹{item.product.price}</p>

            <button onClick={() => dispatch(decrementQty(item.product.id))}>
              -
            </button>

            <span style={{ margin: "0 10px" }}>{item.qty}</span>

            <button onClick={() => dispatch(incrementQty(item.product.id))}>
              +
            </button>
          </div>

          <div>
            <p>
              <strong>₹{item.product.price * item.qty}</strong>
            </p>

            <button onClick={() => dispatch(removeFromCart(item.product.id))}>
              ❌ Remove
            </button>
          </div>
        </div>
      ))}

      {/* 💰 TOTAL SECTION */}
      <hr />
      <h3>Total Amount: ₹{totalAmount}</h3>

      <button
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
