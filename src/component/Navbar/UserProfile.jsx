import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

function UserProfile() {
  const initialValues = {
    firstName: "Md",
    lastName: "Rimel",
    email: "rimel1111@gmail.com",
    address: "Kingston, 5236, United State",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchema = Yup.object({
    newPassword: Yup.string().min(6, "Password too short"),
    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref("newPassword"), null],
      "Passwords must match"
    ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      alert("Profile updated!");
    },
  });

  return (
    <div className="container-fluid bg-white min-vh-100">
      <div className="row py-4 px-2">
        <div className="col-md-3 mb-4">
          <nav className="mb-4">
            <ol className="breadcrumb bg-white px-0">
              <li className="breadcrumb-item text-muted">Home</li>
              <li className="breadcrumb-item active" aria-current="page">
                My Account
              </li>
            </ol>
          </nav>
          <div className="mb-4">
            <div className="fw-bold mb-2">Manage My Account</div>
            <ul className="list-unstyled ms-2">
              <li className="mb-1 text-danger fw-semibold">
                <Link className="text-decoration-none text-black">
                  My Profile
                </Link>
              </li>
              <li className="mb-1 text-muted">
                {" "}
                <Link className="text-decoration-none text-black">
                  Address Book
                </Link>
              </li>
              <li className="mb-1 text-muted">
                <Link className="text-decoration-none text-black">
                  {" "}
                  My Payment Options
                </Link>
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <div className="fw-bold mb-2">My Orders</div>
            <ul className="list-unstyled ms-2">
              <li className="mb-1 text-muted">
                <Link className="text-decoration-none text-black">
                  My Returns
                </Link>
              </li>
              <li className="mb-1 text-muted">
                <Link className="text-decoration-none text-black">
                  My Cancellations
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="fw-bold mb-2">My WishList</div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="d-flex justify-content-end mb-2">
            <span>
              Welcome!{" "}
              <span className="text-danger fw-semibold">
                {initialValues.firstName} {initialValues.lastName}
              </span>
            </span>
          </div>
          <div className="bg-white p-4 rounded shadow-sm border">
            <h5 className="mb-4 text-danger fw-semibold">Edit Your Profile</h5>
            <form onSubmit={formik.handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6 mb-3 mb-md-0">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={formik.values.firstName}
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={formik.values.lastName}
                    disabled
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6 mb-3 mb-md-0">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formik.values.email}
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={formik.values.address}
                    disabled
                  />
                </div>
              </div>
              <div className="mb-2 fw-semibold">Password Changes</div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control mb-2"
                  placeholder="Current Password"
                  name="currentPassword"
                  value={formik.values.currentPassword}
                  onChange={formik.handleChange}
                />
                <input
                  type="password"
                  className="form-control mb-2"
                  placeholder="New Password"
                  name="newPassword"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                />
                {formik.errors.newPassword && (
                  <div className="text-danger">{formik.errors.newPassword}</div>
                )}
                <input
                  type="password"
                  className="form-control mb-2"
                  placeholder="Confirm New Password"
                  name="confirmNewPassword"
                  value={formik.values.confirmNewPassword}
                  onChange={formik.handleChange}
                />
                {formik.errors.confirmNewPassword && (
                  <div className="text-danger">
                    {formik.errors.confirmNewPassword}
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => formik.resetForm()}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-danger">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
