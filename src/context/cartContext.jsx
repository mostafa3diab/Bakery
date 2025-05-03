import axios from "axios";
import { createContext, useState } from "react";

let headers = {
  token: localStorage.getItem("userToken"),
};

export let cartContext = createContext();

export default function CartContextProvider(props) {

  let [cartNumber, setCastNumber] = useState(0);

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
      .then((response) => {
        setCastNumber(response.data.numOfCartItems);
        return response;
      })
      .catch((error) => error);
  }

  function getProductToCart() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: headers,
      })
      .then((response) => {
        setCastNumber(response.data.numOfCartItems);
        return response;
      })
      .catch((error) => error);
  }

  function deleteItemFromCart(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: headers,
      })
      .then((response) => {
        setCastNumber(response.data.numOfCartItems);
        return response;
      })
      .catch((error) => error);
  }

  return (
    <cartContext.Provider
      value={{ addProductToCart, getProductToCart, deleteItemFromCart, cartNumber }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
