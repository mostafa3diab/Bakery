import React, { useState } from "react";
import "./Hero.css";
import hero from "../../assets/images/Apple-iPhone-14.png";

const categories = [
  { name: "Woman’s Fashion", hasArrow: true },
  { name: "Men’s Fashion", hasArrow: true },
  { name: "Electronics" },
  { name: "Home & Lifestyle" },
  { name: "Medicine" },
  { name: "Sports & Outdoor" },
  { name: "Baby’s & Toys" },
  { name: "Groceries & Pets" },
  { name: "Health & Beauty" },
];

const slides = [
  {
    title: "iPhone 14 Series",
    offer: "Up to 10% off Voucher",
    cta: "Shop Now",
    image: hero,
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    bg: "#000",
  },
  {
    title: "iPhone 14 Series",
    offer: "Up to 10% off Voucher",
    cta: "Shop Now",
    image: hero,
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    bg: "#000",
  },
  {
    title: "iPhone 14 Series",
    offer: "Up to 10% off Voucher",
    cta: "Shop Now",
    image: hero,
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    bg: "#000",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  return (
    <div className="hero-main">
      <div className="sidebar">
        <ul>
          {categories.map((cat) => (
            <li key={cat.name}>
              {cat.name}
              {cat.hasArrow && <span className="arrow"></span>}
            </li>
          ))}
        </ul>
      </div>
      <div className="hero-banner">
        <div className="slide" style={{ background: slides[current].bg }}>
          <div className="slide-content">
            <img src={slides[current].logo} alt="logo" className="apple-logo" />
            <div className="slide-title">{slides[current].title}</div>
            <div className="slide-offer">{slides[current].offer}</div>
            <button className="slide-cta">
              {slides[current].cta} <span>&rarr;</span>
            </button>
          </div>
          <img src={slides[current].image} alt="iPhone" className="slide-img" />
        </div>
        <div className="dots">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`dot${idx === current ? " active" : ""}`}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
