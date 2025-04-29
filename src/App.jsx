import "./App.css";
import Home from "./component/Home/Home";
import Cart from "./component/Cart/Cart";
import Blog from "./component/Blog/Blog";
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
        path: "Blog",
        element: (
          <ProductedRoutes>
            <Blog />
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
        path: "Contact",
        element: (
          <ProductedRoutes>
            <Contact />
          </ProductedRoutes>
        ),
      },
      { path: "ProductDetails/:id", element: <ProductDetails /> },
      { path: "Login", element: <Login /> },
      { path: "Register", element: <Register /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <CartContextProvider>
        <UserContextProvider>
          <RouterProvider router={routers}></RouterProvider>
          <Toaster/> 
        </UserContextProvider>
      </CartContextProvider>
    </>
  );
}

export default App;
