import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { cartContext } from "../../context/cartContext";
import "./modalOpen.css";
import { Link } from "react-router-dom";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [sortBy, setSortBy] = useState(""); // "name", "price", "rate"
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [showModalImage, setShowModalImage] = useState(false);

  let { addProductToCart } = useContext(cartContext);

  // Sorting function
  function getSortedProducts(products) {
    let sorted = [...products];
    if (sortBy) {
      sorted.sort((a, b) => {
        let valA, valB;
        if (sortBy === "name") {
          valA = a.title.toLowerCase();
          valB = b.title.toLowerCase();
        } else if (sortBy === "price") {
          valA = a.price;
          valB = b.price;
        } else if (sortBy === "rate") {
          valA = a.ratingsAverage || 0;
          valB = b.ratingsAverage || 0;
        }
        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sorted;
  }

  // Search function
  function getFilteredProducts(products) {
    if (!searchTerm) return products;
    return products.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
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

  // Reset all filters and sorting
  function resetFilters() {
    setSearchTerm("");
    setSortBy("");
    setSortOrder("asc");
    setShowAll(false);
  }

  function getProducts() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then(({ data }) => {
        setProducts(data.data);
      })
      .catch(() => {});
  }

  useEffect(() => {
    getProducts();
  }, []);

  // Get filtered and sorted
  const filtered = getFilteredProducts(products);
  const sorted = getSortedProducts(filtered);
  const initialDisplay = sorted.slice(0, 8);
  const displayProducts = showAll ? sorted : initialDisplay;

  async function addProductItem(id) {
    let response = await addProductToCart(id);
    if (response.data.status === "success") {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }

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
              Our Products
            </span>
            <h2 className="fw-bold mb-0">Explore Our Products</h2>
          </div>
        </div>

        <div className="row mb-4 align-items-center">
          <div className="col-md-4 mb-2 mb-md-0">
            <input
              type="text"
              className="form-control"
              placeholder="Search products by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="rate">Rate</option>
            </select>
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              disabled={!sortBy}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <div className="col-md-3 text-md-end">
            <button
              className="btn btn-outline-secondary"
              onClick={resetFilters}
            >
              Reset
            </button>
          </div>
        </div>

        <div className="row mt-4">
          {displayProducts.map((product, idx) => (
            <div className="col-12 col-sm-6 col-md-3 mb-4" key={idx}>
              <div className="card border-0 shadow-sm h-100 position-relative">
                <div className="card-body text-center d-flex flex-column justify-content-between">
                  <Link
                    to={`/ProductDetails/${product.id}`}
                    className="product-link"
                  >
                    <div className="mb-3">
                      <img
                        src={product.imageCover}
                        alt={product.title}
                        className="w-100"
                      />
                    </div>
                    {/* Wishlist & View icons */}
                    <div
                      className="d-flex justify-content-end gap-2 mb-2"
                      style={{ position: "absolute", top: 12, right: 16 }}
                    >
                      <button className="btn btn-sm btn-light rounded-circle border-0">
                        <i
                          className={"fa-heart fa-regular"}
                          style={{ fontSize: 20 }}
                        ></i>
                      </button>
                      <button className="btn btn-sm btn-light rounded-circle border-0">
                        <i
                          className="fa-regular fa-eye"
                          onClick={(e) => {
                            e.preventDefault();
                            handleImageClick(product.imageCover);
                          }}
                        ></i>
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
                      </div>
                      <div className="text-start mt-2" style={{ fontSize: 15 }}>
                        <span className="text-warning">
                          <i className="fa-solid fa-star"></i>
                        </span>
                        <span className="ms-2 text-muted">
                          ({product.ratingsQuantity})
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
                <button
                  className="btn add-to-cart-btn bg-black text-light"
                  onClick={() => addProductItem(product._id)}
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
        {sorted.length > 8 && (
          <div className="text-center mt-4">
            <button
              className="btn btn-danger px-5 py-2"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll
                ? "Show Less"
                : `Show All Products (${sorted.length - 8} More)`}
            </button>
          </div>
        )}
      </section>
    </>
  );
}

export default AllProducts;
