import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const categories = [
  {
    name: "Woman's Fashion",
    icon: "fa-solid fa-person-dress",
    id: "6439d58a0049ad0b52b9003f",
  },
  {
    name: "Men's Fashion",
    icon: "fa-solid fa-person",
    id: "6439d5b90049ad0b52b90048",
  },
  { name: "Music", icon: "fa-solid fa-music", id: "6439d61c0049ad0b52b90051" },
  {
    name: "SuperMarket",
    icon: "fa-solid fa-basket-shopping",
    id: "6439d41c67d9aa4ca97064d5",
  },
  {
    name: "Baby & Toys",
    icon: "fa-solid fa-baby",
    id: "6439d40367d9aa4ca97064cc",
  },
  { name: "Home", icon: "fa-solid fa-house", id: "6439d3e067d9aa4ca97064c3" },
  { name: "Books", icon: "fa-solid fa-book", id: "6439d3c867d9aa4ca97064ba" },
  {
    name: "Beauty & Health",
    icon: "fa-solid fa-heart",
    id: "6439d30b67d9aa4ca97064b1",
  },
  {
    name: "Mobile",
    icon: "fa-solid fa-mobile-screen-button",
    id: "6439d2f467d9aa4ca97064a8",
  },
  {
    name: "Electronics",
    icon: "fa-solid fa-tv",
    id: "6439d2d167d9aa4ca970649f",
  },
];

const VISIBLE_COUNT = 6;

function BrowseByCategory() {
  const [startIdx, setStartIdx] = useState(0);
  const navigate = useNavigate();

  const canScrollLeft = startIdx > 0;
  const canScrollRight = startIdx < categories.length - VISIBLE_COUNT;

  const handleArrow = (direction) => {
    if (direction === "left" && canScrollLeft) setStartIdx(startIdx - 1);
    if (direction === "right" && canScrollRight) setStartIdx(startIdx + 1);
  };

  const handleCategoryClick = (id) => {
    navigate(`/category/${id}`);
  };

  return (
    <section className="my-4">
      <h4 className="mb-4 fw-bold">Browse By Category</h4>
      <div className="d-flex align-items-center justify-content-center">
        {/* Left Arrow */}
        <button
          className="category-arrow btn btn-link p-0 me-2"
          onClick={() => handleArrow("left")}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        {/* Category Cards */}
        <div className="d-flex gap-3">
          {categories.slice(startIdx, startIdx + VISIBLE_COUNT).map((cat) => (
            <div
              key={cat.name}
              className="category-card text-center border rounded-3 py-4 px-4 bg-white"
              style={{
                width: 140,
                cursor: "pointer",
                transition: "background 0.2s, color 0.2s",
                userSelect: "none",
              }}
              onClick={() => handleCategoryClick(cat.name)}
            >
              <i
                className={`${cat.icon} mb-2`}
                style={{
                  fontSize: "2rem",
                  color: "#222",
                  transition: "color 0.2s",
                }}
              ></i>
              <div className="fw-medium text-dark">{cat.name}</div>
            </div>
          ))}
        </div>
        {/* Right Arrow */}
        <button
          className="category-arrow btn btn-link p-0 ms-2"
          onClick={() => handleArrow("right")}
          disabled={!canScrollRight}
          aria-label="Scroll right"
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </section>
  );
}

export default BrowseByCategory;
