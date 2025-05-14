import "./App.css";
import Products from "./component/Products/Products";
import Cart from "./component/Cart/Cart";
import About from "./component/About/About";
import Layout from "./component/Layout/Layout";
import Login from "./component/Login/Login";
import Register from "./component/Register/Register";
import Notfound from "./component/Notfound/Notfound";
import Contact from "./component/Contact/Contact";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserContextProvider from "./context/userContext";
import ProductedRoutes from "./component/ProductedRoutes/ProductedRoutes";
import ProductDetails from "./component/ProductDetails/ProductDetails";
import CartContextProvider from "./context/cartContext";
import { Toaster } from "react-hot-toast";
import Home from "./component/Home/Home";
import WishlistContextProvider from "./context/wishlistContext";
import Wishlist from "./component/Wishlist/Wishlist";
import UserProfile from "./component/Navbar/UserProfile";
import Checkout from "./component/Checkout/Checkout";
import Allorders from "./component/Allorders/Allorders";

let routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProductedRoutes>
            <Home />
          </ProductedRoutes>
        ),
      },
      {
        path: "Products",
        element: (
          <ProductedRoutes>
            <Products />
          </ProductedRoutes>
        ),
      },
      {
        path: "About",
        element: (
          <ProductedRoutes>
            <About />
          </ProductedRoutes>
        ),
      },
      {
        path: "Cart",
        element: (
          <ProductedRoutes>
            <Cart />
          </ProductedRoutes>
        ),
      },
      {
        path: "Wishlist",
        element: (
          <ProductedRoutes>
            <Wishlist />
          </ProductedRoutes>
        ),
      },
      {
        path: "Contact",
        element: (
          <ProductedRoutes>
            <Contact />
          </ProductedRoutes>
        ),
      },
      {
        path: "UserProfile",
        element: (
          <ProductedRoutes>
            <UserProfile />
          </ProductedRoutes>
        ),
      },
      { path: "ProductDetails/:id", element: <ProductDetails /> },
      {
        path: "Checkout/:cartId",
        element: (
          <ProductedRoutes>
            <Checkout />
          </ProductedRoutes>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProductedRoutes>
            <Allorders />
          </ProductedRoutes>
        ),
      },
      { path: "*", element: <Notfound /> },
    ],
  },
  { path: "Login", element: <Login /> },
  { path: "Register", element: <Register /> },
]);

function App() {
  return (
    <>
      <WishlistContextProvider>
        <CartContextProvider>
          <UserContextProvider>
            <RouterProvider router={routers}></RouterProvider>
            <Toaster />
          </UserContextProvider>
        </CartContextProvider>
      </WishlistContextProvider>
    </>
  );
}

export default App;
