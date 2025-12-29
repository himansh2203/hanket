import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist, clearWishlist } from "../redux/wishlistSlice";
import "../style/Favourite.css"; // optional, for styling

const Favourite = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  if (wishlistItems.length === 0) {
    return <h2 style={{ padding: "20px" }}>❤️ Your wishlist is empty</h2>;
  }

  return (
    <div
      className="favourite-page"
      style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}
    >
      <h2>❤️ My Wishlist</h2>

      {wishlistItems.map((item) => (
        <div
          key={item.id}
          className="favourite-item"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #ddd",
            padding: "10px 0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={item.image || "/placeholder.png"}
              alt={item.name}
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                marginRight: "15px",
              }}
            />
            <div>
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>
            </div>
          </div>

          <button
            onClick={() => dispatch(removeFromWishlist(item.id))}
            style={{
              background: "red",
              color: "#fff",
              border: "none",
              padding: "6px 10px",
              cursor: "pointer",
            }}
          >
            ❌ Remove
          </button>
        </div>
      ))}

      <button
        onClick={() => dispatch(clearWishlist())}
        style={{
          marginTop: "20px",
          background: "black",
          color: "#fff",
          padding: "8px 12px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Clear Wishlist
      </button>
    </div>
  );
};

export default Favourite;
