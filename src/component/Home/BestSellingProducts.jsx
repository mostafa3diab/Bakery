import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { cartContext } from "../../context/cartContext";
import image1 from "../../assets/images/bestSelling1.jpeg";
import image2 from "../../assets/images/bestSelling2.jpeg";
import image3 from "../../assets/images/bestSelling3.jpeg";
import image4 from "../../assets/images/bestSelling4.jpeg";
import "./modalOpen.css";

const products = [
  {
    id: "6428eb43dc1175abc65ca0b3",
    image: image1,
    title: "The north coat",
    price: 260,
    oldPrice: 360,
    rating: 4,
    reviews: 65,
  },
  {
    id: "6428cbd5dc1175abc65ca037",
    image: image2,
    title: "Gucci duffle bag",
    price: 960,
    oldPrice: 1160,
    rating: 5,
    reviews: 65,
  },
  {
    id: "6408da1c6406cd15828e8f0a",
    image: image3,
    title: "RGB liquid CPU Cooler",
    price: 160,
    oldPrice: 170,
    rating: 5,
    reviews: 65,
  },
  {
    id: "6428c320dc1175abc65ca008",
    image: image4,
    title: "Small BookSelf",
    price: 360,
    oldPrice: null,
    rating: 5,
    reviews: 65,
  },
];

function BestSellingProducts() {
  let { addProductToCart } = useContext(cartContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [showModalImage, setShowModalImage] = useState(false);

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
            This Month
          </span>
          <h2 className="fw-bold mb-0">Best Selling Products</h2>
        </div>
        <button className="btn btn-danger px-4 py-2">View All</button>
      </div>
      <div className="row mt-4">
        {products.map((product, idx) => (
          <div className="col-12 col-sm-6 col-md-3 mb-4" key={idx}>
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center d-flex flex-column justify-content-between">
                <div className="mb-3">
                  <img
                    src={product.image}
                    alt={products.title}
                    className="w-100"
                    
                  />
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
                      handleImageClick(product.image);
                    }}
                  >
                    <i className="fa-regular fa-eye"></i>
                  </button>
                </div>
                <div className="mt-3">
                  <div className="fw-semibold text-start">{product.title}</div>
                  <div className="text-start mt-2">
                    <span className="fw-bold text-danger me-2">
                      ${product.price}
                    </span>
                    {product.oldPrice && (
                      <span className="text-muted text-decoration-line-through">
                        ${product.oldPrice}
                      </span>
                    )}
                  </div>
                  <div className="text-start mt-2" style={{ fontSize: 15 }}>
                    <span className="text-warning">
                      {[...Array(product.rating)].map((_, i) => (
                        <i className="fa-solid fa-star" key={i}></i>
                      ))}
                    </span>
                    <span className="ms-2 text-muted">({product.reviews})</span>
                  </div>
                </div>
              </div>
              <button
                className="btn add-to-cart-btn bg-black text-light"
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
  );
}

export default BestSellingProducts;
