// context/wishlistContext.jsx
import axios from "axios";
import { createContext, useEffect, useState } from "react";

let headers = {
  token: localStorage.getItem("userToken"),
};

export const wishlistContext = createContext();

export default function WishlistContextProvider(props) {
  const [wishlistItems, setWishlistItems] = useState([]);

  function addToWishlist(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers }
      )
      .then((response) => {
        return response;
      })
      .catch((error) => error);
  }

  function getWishlist() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers })
      .then((response) => {
        setWishlistItems(response.data.data);
        return response;
      })
      .catch((error) => error);
  }

  // In WishlistContextProvider component
  useEffect(() => {
    const fetchInitialWishlist = async () => {
      try {
        const { data } = await getWishlist();
        setWishlistItems(data.data);
      } catch (error) {
        console.error("Failed to fetch initial wishlist:", error);
      }
    };

    if (headers.token) {
      // Only fetch if user is logged in
      fetchInitialWishlist();
    }
  }, []); // Empty dependency array ensures this runs only on mount

  function removeFromWishlist(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((response) => {
        return response;
      })
      .catch((error) => error);
  }

  return (
    <wishlistContext.Provider
      value={{
        addToWishlist,
        getWishlist,
        removeFromWishlist,
        wishlistItems,
        setWishlistItems,
      }}
    >
      {props.children}
    </wishlistContext.Provider>
  );
}
