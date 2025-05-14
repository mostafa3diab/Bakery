import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import { cartContext } from "../../context/cartContext";
import "./ProductDetails.css";
import { wishlistContext } from "../../context/wishlistContext";
import CategorySlider from "../CategorySlider/CategorySlider";

function ProductDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [mainImg, setMainImg] = useState("");
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);

  const { addProductToCart } = useContext(cartContext);
  const { addToWishlist, removeFromWishlist } = useContext(wishlistContext);

  async function addProductItem(id) {
    let response = await addProductToCart(id, qty);
    if (response.data.status === "success") {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }
  async function addToWishlistItem(id) {
    let response = await addToWishlist(id, qty);
    if (response.data.status === "success") {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }

  async function handleRemoveItem(productId) {
    await removeFromWishlist(productId);
  }

  function getProductDetails() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setDetails(data.data);
        setMainImg(data.data.images[0]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  useEffect(() => {
    getProductDetails();
  }, [id]);

  return (
    <>
      {!isLoading && details ? (
        <div className="container product-details-page py-5">
          {/* Breadcrumb */}
          <nav className="breadcrumb-nav mb-3">
            <Link to="/Products">Products</Link> / <span>{details.title}</span>
          </nav>

          <div className="row g-5">
            {/* Images */}
            <div className="col-lg-6 d-flex">
              <div className="thumbs-list me-3">
                {details.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`thumb-${idx}`}
                    className={`thumb-img ${mainImg === img ? "active" : ""}`}
                    onClick={() => setMainImg(img)}
                  />
                ))}
              </div>
              <div className="main-img-wrap">
                <img src={mainImg} alt={details.title} className="main-img" />
              </div>
            </div>

            {/* Details */}
            <div className="col-lg-6">
              <div className="product-info">
                <h2 className="product-title">{details.title}</h2>
                <div className="d-flex align-items-center mb-2">
                  <span className="stars me-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <i
                        key={i}
                        className={`fa-star ${
                          i < Math.round(details.ratingsAverage)
                            ? "fas star-filled"
                            : "far star-empty"
                        }`}
                      ></i>
                    ))}
                  </span>
                  <span className="reviews">
                    ({details.ratingsQuantity} Reviews)
                  </span>
                  <span className="in-stock ms-3">In Stock</span>
                </div>
                <div className="product-price mb-2">
                  ${details.price.toFixed(2)}
                </div>
                <p className="product-desc">{details.description}</p>

                {/* Quantity & Buy */}
                <div className="d-flex align-items-center mb-4">
                  <button
                    className="qty-btn"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >
                    -
                  </button>
                  <span className="qty-num">{qty}</span>
                  <button
                    className="qty-btn"
                    onClick={() => setQty((q) => q + 1)}
                  >
                    +
                  </button>
                  <button
                    className="buy-btn ms-3"
                    onClick={() => addProductItem(details.id)}
                  >
                    Add To Cart
                  </button>
                  <button
                    className="like-btn ms-2"
                    aria-label="Add to wishlist"
                    onClick={() => setLiked((l) => !l)}
                  >
                    {liked ? (
                      <button
                        onClick={() => handleRemoveItem(details.id)}
                        className="btn"
                      >
                        <i className="fas fa-heart text-danger"></i>
                      </button>
                    ) : (
                      <button
                        onClick={() => addToWishlistItem(details.id)}
                        className="btn"
                      >
                        <i className="far fa-heart"></i>
                      </button>
                    )}
                  </button>
                </div>

                {/* Delivery Info */}
                <div className="delivery-info mb-4">
                  <div className="delivery-card">
                    <i className="fas fa-truck me-2"></i>
                    <span>
                      <strong>Free Delivery</strong>
                      <br />
                      <small>
                        Enter your postal code for Delivery Availability
                      </small>
                    </span>
                  </div>
                  <div className="delivery-card">
                    <i className="fas fa-undo me-2"></i>
                    <span>
                      <strong>Return Delivery</strong>
                      <br />
                      <small>Free 30 Days Delivery Returns. Details</small>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row my-5">
            <CategorySlider />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default ProductDetails;
