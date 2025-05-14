// components/Wishlist/Wishlist.jsx
import React, { useContext, useEffect } from "react";
import { wishlistContext } from "../../context/wishlistContext";

function Wishlist() {
  const { getWishlist, removeFromWishlist, wishlistItems, setWishlistItems } =
    useContext(wishlistContext);

  useEffect(() => {
    fetchWishlist();
  }, []);

  async function fetchWishlist() {
    try {
      const { data } = await getWishlist();
      setWishlistItems(data.data);
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
    }
  }

  async function handleRemoveItem(productId) {
    await removeFromWishlist(productId);
    fetchWishlist();
  }

  return (
    <section className="h-100 h-custom">
      <div className="container py-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-12">
            <h3 className="mb-4">Your Wishlist</h3>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Category</th>
                    <th scope="col">Price</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {wishlistItems?.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={item.imageCover}
                            className="img-fluid rounded-3"
                            style={{ width: "120px" }}
                            alt={item.title}
                          />
                          <div className="ms-4">
                            <p className="mb-0">{item.title}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className=" mt-5">
                          <p className="mb-0">{item.category.name}</p>
                        </div>
                      </td>
                      <td>
                        <div className="mt-5">
                          <p className="mb-0">{item.price} EGP</p>
                        </div>
                      </td>
                      <td>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="btn btn-danger mt-5"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                  {wishlistItems?.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        Your wishlist is empty
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Wishlist;
