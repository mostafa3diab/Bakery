import { useContext, useEffect, useState } from "react";
import { cartContext } from "../../context/cartContext";
import { Link } from "react-router-dom";
import OrderProgressBar from "../OrderProgressBar/OrderProgressBar";

function Cart() {
  let [product, setProduct] = useState(null);
  let { getProductToCart, deleteItemFromCart } = useContext(cartContext);
  let [cartId, setCartId] = useState(null);

  async function getProduct() {
    try {
      let { data } = await getProductToCart();
      setProduct(data?.data?.products);
      setCartId(data?.data._id);
    } catch (error) {
      console.error("Failed to fetch cart products:", error);
    }
  }

  async function deleteItem(id) {
    let { data } = await deleteItemFromCart(id);
    setProduct(data?.data?.products);
  }

  function handleIncrease(index) {
    setProduct((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, count: item.count + 1 } : item
      )
    );
  }

  function handleDecrease(index) {
    setProduct((prev) =>
      prev.map((item, i) =>
        i === index && item.count > 1
          ? { ...item, count: item.count - 1 }
          : item
      )
    );
  }

  function calculateTotal() {
    if (!product || product.length === 0) return 0;
    return product.reduce((total, item) => total + item.price * item.count, 0);
  }

  useEffect(() => {
    getProduct();
  });

  return (
    <>
      <section className="h-100 h-custom">
        <div className="container h-100 py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="table-responsive">
                <table className="table">
                  <div>
                    <OrderProgressBar currentStep={1} />
                  </div>
                  <thead>
                    <tr>
                      <th scope="col" className="h5">
                        Shopping Bag
                      </th>
                      <th scope="col">Category</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  {product?.map((item, index) => (
                    <tbody key={index}>
                      <tr>
                        <th scope="row">
                          <div className="d-flex align-items-center">
                            <img
                              src={item.product.imageCover}
                              className="img-fluid rounded-3"
                              style={{ width: "120px" }}
                              alt={item.product.title}
                            />
                            <div className="flex-column ms-4">
                              <p className="mb-2">{item.product.title}</p>
                            </div>
                          </div>
                        </th>
                        <td className="align-middle">
                          <p className="mb-0" style={{ fontWeight: 500 }}>
                            {item.product.category.name}
                          </p>
                        </td>
                        <td className="align-middle">
                          <div className="d-flex flex-row">
                            <button
                              className="btn btn-link px-2"
                              onClick={() => handleDecrease(index)}
                            >
                              <i className="fas fa-minus"></i>
                            </button>
                            <input
                              id="form1"
                              min="1"
                              value={item.count}
                              name="quantity"
                              type="number"
                              className="form-control form-control-sm"
                              style={{ width: "50px" }}
                              readOnly
                            />
                            <button
                              className="btn btn-link px-2"
                              onClick={() => handleIncrease(index)}
                            >
                              <i className="fas fa-plus"></i>
                            </button>
                          </div>
                        </td>
                        <td className="align-middle">
                          <p className="mb-0" style={{ fontWeight: 500 }}>
                            {item.price} EGP
                          </p>
                        </td>
                        <td className="align-middle">
                          <span>
                            <button
                              onClick={() => {
                                deleteItem(item?.product?.id);
                              }}
                              className="btn btn-link px-2"
                            >
                              <i className="fa-solid fa-trash text-danger"></i>
                            </button>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
              <div
                className="card shadow-2-strong mb-5 mb-lg-0"
                style={{ borderRadius: "16px" }}
              >
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-lg-4 col-xl-3">
                      <div>
                        <div
                          className="d-flex justify-content-between mb-4"
                          style={{ fontWeight: 500 }}
                        >
                          <p className="mb-2 mx-2">Price</p>{" "}
                          <p className="mb-2 mx-2">{calculateTotal()} EGP</p>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-between"
                        style={{ fontWeight: 500 }}
                      >
                        <p className="mb-0">Shipping</p>
                        <p className="mb-0 mx-2"></p>
                      </div>
                      <hr className="my-4" />
                      <div
                        className="d-flex justify-content-between mb-4"
                        style={{ fontWeight: 500 }}
                      >
                        <p className="mb-2">Total</p>
                        <p className="mb-2">{calculateTotal()} EGP</p>
                      </div>
                      <Link
                        to={`/checkout/${cartId}`}
                        className="btn btn-primary btn-block btn-lg"
                      >
                        Checkout
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
