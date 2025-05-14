import React, { useEffect, useState } from "react";
import product from "../../assets/images/product.png";
import "./MusicBanner.css"; // See CSS below

const END_TIME = new Date(
  Date.now() +
    5 * 24 * 60 * 60 * 1000 +
    23 * 60 * 60 * 1000 +
    59 * 60 * 1000 +
    35 * 1000
); // 5 days, 23 hours, 59 minutes, 35 seconds from now

function getTimeLeft(endTime) {
  const total = Math.max(0, endTime - new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds };
}

export default function MusicBanner() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(END_TIME));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(END_TIME));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="music-banner-container">
      <div className="music-banner-content d-flex flex-column justify-content-center h-100">
        <span className="music-banner-category mb-2">Categories</span>
        <h1 className="music-banner-title mb-4">
          Enhance Your <br /> Music Experience
        </h1>
        <div className="music-banner-timer d-flex mb-4">
          <TimerCircle value={timeLeft.hours} label="Hours" />
          <TimerCircle value={timeLeft.days} label="Days" />
          <TimerCircle value={timeLeft.minutes} label="Minutes" />
          <TimerCircle value={timeLeft.seconds} label="Seconds" />
        </div>
        <button className="music-banner-btn">Buy Now!</button>
      </div>
      <div className="music-banner-image">
        <img
          src={product}
          alt="JBL Speaker"
          className="music-banner-product-img"
        />
      </div>
    </div>
  );
}

function TimerCircle({ value, label }) {
  return (
    <div className="music-banner-timer-circle text-center mx-2">
      <div className="circle-value">{String(value).padStart(2, "0")}</div>
      <div className="circle-label">{label}</div>
    </div>
  );
}
