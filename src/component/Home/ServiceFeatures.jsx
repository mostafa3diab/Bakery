import React from "react";

const features = [
  {
    icon: "fa-solid fa-truck-fast",
    title: "FREE AND FAST DELIVERY",
    subtitle: "Free delivery for all orders over $140",
  },
  {
    icon: "fa-solid fa-headset",
    title: "24/7 CUSTOMER SERVICE",
    subtitle: "Friendly 24/7 customer support",
  },
  {
    icon: "fa-solid fa-circle-check",
    title: "MONEY BACK GUARANTEE",
    subtitle: "We return money within 30 days",
  },
];

function ServiceFeatures() {
  return (
    <section className="container my-5">
      <div className="row text-center justify-content-center">
        {features.map((feature, idx) => (
          <div className="col-12 col-md-4 mb-4 mb-md-0" key={idx}>
            <div className="d-flex flex-column align-items-center">
              <span
                className="d-flex align-items-center justify-content-center mb-3"
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "#e0e0e0",
                }}
              >
                <span
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "#111",
                  }}
                >
                  <i
                    className={feature.icon}
                    style={{ color: "#fff", fontSize: 24 }}
                  ></i>
                </span>
              </span>
              <div className="fw-bold" style={{ letterSpacing: 0.5 }}>
                {feature.title}
              </div>
              <div className="text-muted small mt-1">{feature.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ServiceFeatures;
