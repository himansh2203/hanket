import React from "react";
import { useSelector } from "react-redux";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );

  const loadRazorpay = () => {
    const options = {
      key: "rzp_test_XXXXXX", // test key
      amount: total * 100,
      currency: "INR",
      name: "Hanket Store",
      description: "Order Payment",
      handler: function (response) {
        alert("Payment Successful 🎉");
        console.log(response);
      },
      theme: {
        color: "#000",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Checkout</h2>

      {cartItems.map((item) => (
        <p key={item.product.id}>
          {item.product.name} × {item.qty}
        </p>
      ))}

      <h3>Total Payable: ₹{total.toFixed(2)}</h3>

      <button style={{ marginTop: "20px" }}>Pay Now</button>
      <button onClick={loadRazorpay}>Pay with Razorpay</button>
    </div>
  );
};

export default Checkout;
