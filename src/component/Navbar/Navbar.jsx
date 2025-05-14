import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../../context/userContext";
import { cartContext } from "../../context/cartContext";
import "./Navbar.css";
import ProfileDropdown from "./ProfileDropdown";

function Navbar() {
  let { isLogin } = useContext(userContext);
  let { cartNumber } = useContext(cartContext);

  return (
    <nav className="border-bottom border-1">
      <div className="d-flex flex-wrap flex-column flex-lg-row justify-content-between container">
        <div className="logo d-flex flex-wrap">
          {isLogin ? (
            <ul className="d-flex flex-column  flex-lg-row list-unstyled p-3">
              <li>
                <NavLink className="text-decoration-none p-2 text-black">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"Products"}
                  className="text-decoration-none p-2 text-black"
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"About"}
                  className="text-decoration-none p-2 text-black"
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"Contact"}
                  className="text-decoration-none p-2 text-black"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          ) : null}
        </div>

        <div className="social d-flex flex-wrap">
          {!isLogin ? (
            <ul className="d-flex flex-column flex-lg-row list-unstyled p-3">
              <li>
                <NavLink to={"Login"} className="text-decoration-none p-2">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to={"Register"} className="text-decoration-none p-2">
                  Register
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul className="d-flex flex-column flex-lg-row p-3 list-unstyled">
              <li className="mx-3">
                <NavLink to={"Wishlist"} className="text-decoration-none">
                  <i className="fa-regular fa-heart text-dark">
                    <span className="badge bg-danger text-dark rounded-circle"></span>
                  </i>
                </NavLink>
              </li>
              <li>
                <NavLink to={"Cart"} className="text-decoration-none">
                  <i className="fa-solid fa-cart-shopping text-black cart">
                    <span className="badge bg-danger text-dark rounded-circle">
                      {cartNumber}
                    </span>
                  </i>
                </NavLink>
              </li>
              <li>
                <ProfileDropdown />
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
