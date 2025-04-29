import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { cartContext } from "../../context/cartContext";
import toast from "react-hot-toast";
import CategorySlider from "../CategorySlider/CategorySlider";

function Home() {
  const [products, setProducts] = useState([]);
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

  function getProducts() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then(({ data }) => {
        setLoading(false);
        console.log(data);
        setProducts(data.data);
      })

      .catch(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="container my-5">
        <CategorySlider />
        {!isLoading ? (
          <div className="d-flex flex-wrap">
            {products.map((productInfo) => {
              return (
                <>
                  <div className="px-4 styleProduct">
                    <Link to={`/ProductDetails/${productInfo.id}`}>
                      <img
                        src={productInfo.imageCover}
                        className="w-100"
                        alt={productInfo.title}
                      />
                      <span className="text-info d-block">
                        {" "}
                        {productInfo.category.name}{" "}
                      </span>
                      <span className="d-block">
                        {" "}
                        {productInfo.title
                          .split(" ")
                          .slice(0, 3)
                          .join(" ")}{" "}
                      </span>

                      <div className="d-flex justify-content-between my-2">
                        <span>{productInfo.price} EGP</span>
                        <span>
                          {productInfo.ratingsQuantity}
                          <i className="fas fa-star text-warning"></i>
                        </span>
                      </div>
                    </Link>
                    <button
                      className="btn bg-info text-white p-2 m-2 w-100"
                      onClick={() => {
                        addProductItem(productInfo.id);
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </>
              );
            })}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}

export default Home;
