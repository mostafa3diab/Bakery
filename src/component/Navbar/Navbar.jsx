import logo from "../../assets/images/images.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../../context/userContext";
import { cartContext } from "../../context/cartContext";
import "./Navbar.css";

function Navbar() {
  let { isLogin, setLogin } = useContext(userContext);
  let { cartNumber } = useContext(cartContext);
  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("userToken");
    setLogin(null);
    navigate("/login");
  }

  return (
    <nav className="bg-light">
      <div className="d-flex flex-wrap flex-column flex-lg-row justify-content-between">
        <div className="logo d-flex flex-wrap">
          <img src={logo} alt="" width="70" />
          {isLogin ? (
            <ul className="d-flex flex-column flex-lg-row list-unstyled p-3 ">
              <li>
                <NavLink className="text-decoration-none p-2">Home</NavLink>
              </li>
              <li>
                <NavLink to={"Blog"} className="text-decoration-none p-2">
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink to={"Contact"} className="text-decoration-none p-2">
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
              <li>
                <NavLink to={"Cart"} className="text-decoration-none">
                  <i class="fa-solid fa-cart-shopping text-black cart">
                    <span className="badge bg-primary text-dark rounded-circle">
                      {cartNumber}
                    </span>
                  </i>
                </NavLink>
              </li>
              <li>
                <NavLink className="p-2 text-decoration-none">
                  <span
                    onClick={() => {
                      logOut();
                    }}
                  >
                    Logout
                  </span>
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
