import React from "react";
import "./About.css"; // Import the CSS below

const stats = [
  {
    icon: "fa-store",
    value: "10.5k",
    label: "Sallers active our site",
  },
  {
    icon: "fa-dollar-sign",
    value: "33k",
    label: "Mopnthly Produaduct Sale",
  },
  {
    icon: "fa-shopping-bag",
    value: "45.5k",
    label: "Customer active in our site",
  },
  {
    icon: "fa-money-bill",
    value: "25k",
    label: "Anual gross sale in our site",
  },
];

export default function StatsCards() {
  return (
    <div className="stats-row">
      {stats.map((stat, idx) => (
        <div className="stats-card" key={idx}>
          <div className="stats-icon">
            <i className={`fas ${stat.icon}`}></i>
          </div>
          <div className="stats-value">{stat.value}</div>
          <div className="stats-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
