import axios from "axios";
import { createContext } from "react";

let headers = {
  token: localStorage.getItem("userToken"),
};

export let cartContext = createContext();

export default function CartContextProvider(props) {
  function addProductToCart(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: productId,
        },
        {
          headers: headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function getProductToCart() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  function deleteItemFromCart(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  return (
    <cartContext.Provider
      value={{ addProductToCart, getProductToCart, deleteItemFromCart }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
