import React from "react";
import image1 from "../../assets/images/bestSelling1.jpeg";
import image2 from "../../assets/images/bestSelling2.jpeg";
import image3 from "../../assets/images/bestSelling3.jpeg";
import image4 from "../../assets/images/bestSelling4.jpeg";
import "./Home.css";

const cards = [
  {
    title: "PlayStation 5",
    desc: "Black and White version of the PS5 coming out on sale.",
    img: image1,
    big: true,
    link: "#",
  },
  {
    title: "Women's Collections",
    desc: "Featured woman collections that give you another vibe.",
    img: image2,
    link: "#",
  },
  {
    title: "Speakers",
    desc: "Amazon wireless speakers",
    img: image3,
    link: "#",
  },
  {
    title: "Perfume",
    desc: "GUCCI INTENSE OUD EDP",
    img: image4,
    link: "#",
  },
];

function NewArrival() {
  return (
    <section className="container my-5">
      <div className="d-flex align-items-center mb-2">
        <span className="me-2" style={{ color: "#dc3545", fontWeight: 500 }}>
          <span className="me-1" style={{ fontSize: 22 }}>
            ▌
          </span>{" "}
          Featured
        </span>
      </div>
      <h2 className="fw-bold mb-4">New Arrival</h2>
      <div className="row g-3">
        <div className="col-12 col-md-6">
          <FeatureCard {...cards[0]} />
        </div>
        <div className="col-12 col-md-6">
          <div className="row g-3">
            <div className="col-12">
              <FeatureCard {...cards[1]} />
            </div>
            <div className="col-6">
              <FeatureCard {...cards[2]} />
            </div>
            <div className="col-6">
              <FeatureCard {...cards[3]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, desc, img, big }) {
  return (
    <div
      className={`feature-card position-relative overflow-hidden rounded-3 text-white ${
        big ? "feature-card-big" : ""
      }`}
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: big ? 370 : 175,
        cursor: "pointer",
      }}
      tabIndex={0}
    >
      <div className="feature-card-overlay"></div>
      <div className="position-absolute bottom-0 start-0 p-4 w-100">
        <h5 className="fw-bold mb-1">{title}</h5>
        <p className="mb-2" style={{ fontSize: 15 }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

export default NewArrival;
