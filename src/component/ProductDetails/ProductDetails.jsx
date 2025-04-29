import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import { cartContext } from "../../context/cartContext";
import CategorySlider from "../CategorySlider/CategorySlider";

function ProductDetails() {
  let { id } = useParams();

  const [details, setDetails] = useState(null);
  const [isLoading, setLoading] = useState(true);

  let { addProductToCart } = useContext(cartContext);

  async function addProductItem(id) {
    let response = await addProductToCart(id);
    console.log("response", response);
    if (response.data.status === "success") {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }

  function getProductDetails() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)

      .then(({ data }) => {
        console.log(data.data);
        setLoading(false);

        setDetails(data.data);
      })

      .catch(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <>
      {!isLoading ? (
        <div className="container">
          <div className="d-flex justify-content-center align-items-center wrap my-5">
            <div className="w-25 mx-5 detailImg">
              <Link to={"/"} className="btn bg-info my-3">
                <i class="fa-solid fa-arrow-left"></i> Back
              </Link>
              <img
                src={details?.imageCover}
                alt={details?.title}
                className="w-100"
              />
            </div>
            <div className="w-50 justify-content-center align-items-center detail">
              <h2>{details?.title}</h2>
              <p>{details?.description}</p>
              <p>{details?.category.name}</p>
              <div className="d-flex justify-content-between">
                <span>{details?.price} EGP</span>
                <span>
                  {details?.ratingsQuantity}{" "}
                  <i className="fas fa-star text-warning"></i>
                </span>
              </div>
              <button
                onClick={() => {
                  addProductItem(details?.id);
                }}
                className="btn bg-info w-100 py-3"
              >
                Add to Cart
              </button>
            </div>
          </div>
          <CategorySlider />
        </div>
      ) : (
        <Loader />
      )}
      <div className="py-3"></div>
    </>
  );
}

export default ProductDetails;
