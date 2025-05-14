import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useContext } from "react";
import { cartContext } from "../../context/cartContext";
import sale1 from "../../assets/images/sale1.jpeg";
import sale2 from "../../assets/images/sale2.jpeg";
import sale3 from "../../assets/images/sale3.jpeg";
import sale4 from "../../assets/images/sale4.jpeg";
import "./modalOpen.css";

const END_TIME = new Date(
  Date.now() +
    5 * 24 * 60 * 60 * 1000 +
    23 * 60 * 60 * 1000 +
    59 * 60 * 1000 +
    35 * 1000
); // 5 days, 23 hours, 59 minutes, 35 seconds from now

function Sale() {
  let { addProductToCart } = useContext(cartContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [showModalImage, setShowModalImage] = useState(false);

  function getTimeLeft(endTime) {
    const total = Math.max(0, endTime - new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (10000 * 60 * 60 * 24));
    return { days, hours, minutes, seconds };
  }

  const [timeLeft, setTimeLeft] = useState(getTimeLeft(END_TIME));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(END_TIME));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const sale = [
    {
      id: "6428ebc6dc1175abc65ca0b9",
      img: sale1,
      title: "Women's Shawl",
      price: 191,
      priceBefore: 249,
      rate: 4,
      sale: 40,
      reviews: 18,
    },
    {
      id: "6408e43a6406cd15828e8f22",
      img: sale2,
      title: "EOS M50 Mark II",
      price: 19699,
      priceBefore: 23699,
      rate: 5,
      sale: 35,
      reviews: 25,
    },
    {
      id: "6428c962dc1175abc65ca025",
      img: sale3,
      title: "Duramo 10 Running Shoes",
      price: 1999,
      priceBefore: 2499,
      rate: 5,
      sale: 30,
      reviews: 36,
    },
    {
      id: "6428dfa0dc1175abc65ca067",
      img: sale4,
      title: "Logo T-Shirt Green",
      price: 744,
      priceBefore: 1249,
      rate: 4,
      sale: 30,
      reviews: 49,
    },
  ];

  async function addProductItem(id) {
    let response = await addProductToCart(id);
    if (response.data.status === "success") {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }

  const handleImageClick = (img) => {
    setModalImage(img);
    setModalOpen(true);
    setTimeout(() => setShowModalImage(true), 10);
  };

  const handleCloseModal = () => {
    setShowModalImage(false);
    setTimeout(() => {
      setModalOpen(false);
      setModalImage(null);
    }, 300);
  };

  return (
    <>
      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <span
              className="d-inline-flex align-items-center mb-2"
              style={{ color: "#dc3545", fontWeight: 500 }}
            >
              <span className="me-2" style={{ fontSize: 22 }}>
                ▌
              </span>
              Today's
            </span>
            <h2 className="fw-bold mb-0">Flash Sales</h2>
          </div>
          <div className="music-banner-timer d-flex mb-4 align-items-center">
            <TimerCircle value={timeLeft.days} label="Days" />
            <span className="fs-1">:</span>
            <TimerCircle value={timeLeft.hours} label="Hours" />
            <span className="fs-1">:</span>
            <TimerCircle value={timeLeft.minutes} label="Minutes" />{" "}
            <span className="fs-1">:</span>
            <TimerCircle value={timeLeft.seconds} label="Seconds" />
          </div>
          <button className="btn btn-danger px-4 py-2">View All</button>
        </div>
        <div className="row mt-4">
          {sale.map((product, idx) => (
            <div className="col-12 col-sm-6 col-md-3 mb-4" key={idx}>
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center d-flex flex-column justify-content-between">
                  <div className="position-relative mb-3">
                    <img
                      src={product.img}
                      className="card-img-top"
                      alt={product.title}
                    />
                    <span className="position-absolute top-0 start-0 m-3 px-2 bg-danger rounded text-light">
                      -{product.sale}%
                    </span>
                  </div>
                  {/* Wishlist & View icons */}
                  <div
                    className="d-flex justify-content-end gap-2 mb-2"
                    style={{ position: "absolute", top: 12, right: 16 }}
                  >
                    <button className="btn btn-sm btn-light rounded-circle border-0">
                      <i className="fa-regular fa-heart"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-light rounded-circle border-0"
                      onClick={(e) => {
                        e.preventDefault();
                        handleImageClick(product.img);
                      }}
                    >
                      <i className="fa-regular fa-eye"></i>
                    </button>
                  </div>
                  <div className="mt-3">
                    <div className="fw-semibold text-start">
                      {product.title}
                    </div>
                    <div className="text-start mt-2">
                      <span className="fw-bold text-danger me-2">
                        ${product.price}
                      </span>
                      {product.priceBefore && (
                        <span className="text-muted text-decoration-line-through">
                          ${product.priceBefore}
                        </span>
                      )}
                    </div>
                    <div className="text-start mt-2" style={{ fontSize: 15 }}>
                      <span className="text-warning">
                        {[...Array(product.rate)].map((_, i) => (
                          <i className="fa-solid fa-star" key={i}></i>
                        ))}
                      </span>
                      <span className="ms-2 text-muted">
                        ({product.reviews})
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  className="btn add-to-cart-btn bg-dark text-light"
                  onClick={() => addProductItem(product.id)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        {modalOpen && (
          <div
            className="modal-backdrop"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
            }}
            onClick={handleCloseModal}
          >
            <div className="container">
              <div className="row">
                <div className="col-12 text-center">
                  <img
                    src={modalImage}
                    alt="Popup"
                    style={{
                      maxWidth: "50vw",
                      maxHeight: "50vh",
                      borderRadius: "8px",
                      boxShadow: "0 2px 16px #000",
                      transition:
                        "transform 0.3s cubic-bezier(.4,2,.6,1), opacity 0.3s",
                      transform: showModalImage ? "scale(1)" : "scale(0.8)",
                      opacity: showModalImage ? 1 : 0,
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            </div>
            <button
              style={{
                position: "absolute",
                top: 30,
                right: 30,
                fontSize: 32,
                color: "#fff",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              onClick={handleCloseModal}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        )}
      </section>
    </>
  );
}

export default Sale;

function TimerCircle({ value, label }) {
  return (
    <div className="music-banner-timer-circle text-center mx-2 text-dark">
      <div className="circle-value">{String(value).padStart(2, "0")}</div>
      <div className="circle-label">{label}</div>
    </div>
  );
}
