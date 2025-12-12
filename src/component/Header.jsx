import React, { useState, useEffect, useRef, useCallback } from "react";
import "../style/Header.css";
import logo from "../assets/hanket_image.ico";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaShoppingCart, FaSearch } from "react-icons/fa";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const navigate = useNavigate();

  const suggestionRef = useRef(null);
  const searchRef = useRef(null);

  const isLoggedIn = true; // replace with real auth logic

  // 🔥 fetchSuggestions memoized so useEffect can reference it safely
  const fetchSuggestions = useCallback(async (query) => {
    if (!query || !query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8080/search/suggestions?query=${encodeURIComponent(
          query
        )}&limit=10`
      );

      if (!res.ok) {
        // handle non-2xx
        console.error("Suggestion API error:", res.status);
        setSuggestions([]);
        return;
      }

      const data = await res.json();
      // Expecting [{name,type}, ...]
      setSuggestions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Suggestion fetch error:", error);
      setSuggestions([]);
    }
  }, []); // no dependencies here; change if you reference props/state

  // Debounce searchTerm changes
  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchTerm.trim() === "") {
        setSuggestions([]);
        return;
      }
      fetchSuggestions(searchTerm);
    }, 300);

    return () => clearTimeout(delay);
  }, [searchTerm, fetchSuggestions]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const onClick = (e) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(e.target) &&
        searchRef.current &&
        !searchRef.current.contains(e.target)
      ) {
        setSuggestions([]);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const handleSearch = (e) => {
    e?.preventDefault?.();

    if (activeIndex >= 0 && suggestions[activeIndex]) {
      navigate(
        `/search?query=${encodeURIComponent(suggestions[activeIndex].name)}`
      );
    } else if (searchTerm.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }

    setSearchTerm("");
    setSuggestions([]);
    setActiveIndex(-1);
    if (open) setOpen(false);
  };

  // Keyboard navigation for suggestions
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      // Let form submit handle navigation
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setActiveIndex(-1);
    }
  };

  return (
    <header className="premium-header">
      <div className="header-container">
        {/* LOGO */}
        <div className="header-logo" onClick={() => navigate("/")}>
          <img src={logo} alt="Logo" className="header-logo-img" />
          <h2 className="header-brand">HANKET</h2>
        </div>

        {/* NAV LINKS */}
        <ul className={open ? "header-links header-active" : "header-links"}>
          <li>
            <Link className="header-link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="header-link" to="/products">
              Products
            </Link>
          </li>
          <li>
            <Link className="header-link" to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="header-link" to="/services">
              Services
            </Link>
          </li>
          <li>
            <Link className="header-link" to="/contact">
              Contact
            </Link>
          </li>

          {/* SEARCH BAR */}
          <li className="search-li">
            <form className="header-search-form" onSubmit={handleSearch}>
              <input
                ref={searchRef}
                type="text"
                placeholder="Search products, brands, categories..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setActiveIndex(-1);
                }}
                onKeyDown={handleKeyDown}
                className="header-search-input"
                aria-autocomplete="list"
                aria-expanded={suggestions.length > 0}
                aria-activedescendant={
                  activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined
                }
              />
              <button
                type="submit"
                className="header-search-btn"
                aria-label="Search"
              >
                <FaSearch />
              </button>
            </form>

            {/* SUGGESTION DROPDOWN */}
            {suggestions.length > 0 && (
              <div className="search-suggestion-box" ref={suggestionRef}>
                {suggestions.map((item, i) => (
                  <div
                    id={`suggestion-${i}`}
                    key={`${item.name}-${i}`}
                    className={`suggestion-item ${
                      activeIndex === i ? "active-suggestion" : ""
                    }`}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => {
                      navigate(
                        `/search?query=${encodeURIComponent(item.name)}`
                      );
                      setSearchTerm("");
                      setSuggestions([]);
                      setActiveIndex(-1);
                    }}
                  >
                    <p className="s-title">{item.name}</p>
                    <span className="s-type">{item.type}</span>
                  </div>
                ))}
              </div>
            )}
          </li>
        </ul>

        {/* CTA BUTTONS / PROFILE-CART */}
        <div className="header-btn-group">
          {!isLoggedIn ? (
            <>
              <button
                className="header-btn login-btn"
                onClick={() => navigate("/login")}
              >
                Login
              </button>

              <button
                className="header-btn signup-btn"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <button
                className="header-icon-btn"
                onClick={() => navigate("/profile")}
              >
                <FaUserCircle size={24} />
              </button>
              <button
                className="header-icon-btn"
                onClick={() => navigate("/cart")}
              >
                <FaShoppingCart size={24} />
              </button>
            </>
          )}
        </div>

        {/* HAMBURGER */}
        <div
          className="header-hamburger"
          onClick={() => setOpen(!open)}
          role="button"
          aria-label="Toggle menu"
        >
          <span className={open ? "h-line h1" : "h-line"}></span>
          <span className={open ? "h-line h2" : "h-line"}></span>
          <span className={open ? "h-line h3" : "h-line"}></span>
        </div>
      </div>
    </header>
  );
};

export default Header;
