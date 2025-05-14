import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { cartContext } from "../../context/cartContext";
import toast from "react-hot-toast";
import CategorySlider from "../CategorySlider/CategorySlider";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  const { addProductToCart } = useContext(cartContext);

  async function addProductItem(id) {
    let response = await addProductToCart(id);
    if (response.data.status === "success") {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }

  function getProducts() {
    setLoading(true);
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then(({ data }) => {
        setProducts(data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getProducts();
  }, []);

  // Filter products by search term
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortBy) return 0;

    if (sortBy === "price") {
      return a.price - b.price;
    } else if (sortBy === "name") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "rate") {
      // Assuming ratingsAverage is the rating field
      return (b.ratingsAverage || 0) - (a.ratingsAverage || 0);
    }
    return 0;
  });

  // Clear search and sort
  const clearFilters = () => {
    setSearchTerm("");
    setSortBy("");
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="Products-container my-5">
          <CategorySlider />

          {/* Search and Sort Controls */}
          <section className="my-4 container">
            <div className="row g-2 align-items-center">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search products by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search products"
                />
              </div>
              <div className="col-md-3">
                <select
                  className="form-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort products"
                >
                  <option value="">Sort By</option>
                  <option value="price">Price</option>
                  <option value="name">Name</option>
                  <option value="rate">Rate</option>
                </select>
              </div>
              <div className="col-md-3 d-grid">
                <button
                  className="btn btn-outline-secondary"
                  onClick={clearFilters}
                  disabled={!searchTerm && !sortBy}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </section>

          {/* Products Grid */}
          <section className="products-section container">
            {sortedProducts.length === 0 ? (
              <p>No products found.</p>
            ) : (
              <div className="products-grid">
                {sortedProducts.map((productInfo) => (
                  <div className="product-card" key={productInfo.id}>
                    <Link
                      to={`/ProductDetails/${productInfo.id}`}
                      className="product-link"
                    >
                      <div className="product-image-wrapper">
                        <img
                          src={productInfo.imageCover}
                          className="product-image"
                          alt={productInfo.title}
                          loading="lazy"
                        />
                      </div>
                      <div className="product-info my-3">
                        <span className="product-category my-1">
                          {productInfo.category?.name || "Unknown"}
                        </span>
                        <h2 className="product-title">
                          {productInfo.title.split(" ").slice(0, 3).join(" ")}
                        </h2>
                        <div className="product-meta">
                          <span className="product-price">
                            {productInfo.price} EGP
                          </span>
                          <span className="product-rating">
                            {productInfo.ratingsQuantity}{" "}
                            <i className="fas fa-star text-warning"></i>
                          </span>
                        </div>
                      </div>
                    </Link>
                    <button
                      className="btn add-to-cart-btn"
                      onClick={() => addProductItem(productInfo.id)}
                    >
                      Add To Cart
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
}

export default Products;
