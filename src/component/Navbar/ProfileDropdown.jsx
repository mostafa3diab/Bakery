import React, { useState, useRef, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { userContext } from "../../context/userContext";

function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  let navigate = useNavigate();
  let { setLogin } = useContext(userContext);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function logOut() {
    localStorage.removeItem("userToken");
    setLogin(null);
    navigate("/login");
  }

  return (
    <div className="position-relative" ref={dropdownRef}>
      <span
        className={`profile-avatar`}
        style={{ cursor: "pointer", marginLeft: 20 }}
        onClick={() => setOpen((prev) => !prev)}
        tabIndex={0}
        onMouseEnter={(e) => e.currentTarget.classList.add("text-danger")}
        onMouseLeave={(e) => e.currentTarget.classList.remove("text-danger")}
      >
        <i className="fa-solid fa-user" style={{ fontSize: 22 }}></i>
      </span>

      {/* Dropdown */}
      {open && (
        <div
          className="profile-dropdown-menu shadow rounded-3 p-3"
          style={{
            minWidth: 230,
            position: "absolute",
            top: 48,
            right: 0,
            background: "rgba(0, 0, 0, 0.45)",
            zIndex: 100,
          }}
        >
          <ul className="list-unstyled mb-0">
            <li>
              <NavLink
                to="/UserProfile"
                className="dropdown-item d-flex align-items-center gap-2 text-light"
              >
                <i className="fa-solid fa-user"></i>
                Manage My Account
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/orders"
                className="dropdown-item d-flex align-items-center gap-2 text-light"
              >
                <i className="fa-solid fa-box"></i>
                My Order
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cancellations"
                className="dropdown-item d-flex align-items-center gap-2 text-light"
              >
                <i className="fa-solid fa-xmark"></i>
                My Cancellations
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reviews"
                className="dropdown-item d-flex align-items-center gap-2 text-light"
              >
                <i className="fa-solid fa-star"></i>
                My Reviews
              </NavLink>
            </li>
            <li>
              <button
                className="dropdown-item d-flex align-items-center gap-2 text-light"
                onClick={() => {
                  logOut();
                }}
              >
                <i className="fa-solid fa-right-from-bracket"></i>
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
