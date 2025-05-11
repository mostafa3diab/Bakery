import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../context/userContext";

function Register() {
  let navigate = useNavigate();

  let { setLogin } = useContext(userContext);

  async function handleRegister(values) {
    console.log("Register", values);
    try {
      let response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      console.log("Full response", response);
      console.log("Certain Response", response.data);
      if (response.data.message === "success") {
        localStorage.setItem("userToken", response.data.token);
        setLogin(response.data.token);

        navigate("/Login");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  let validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(5, "Min length is 5")
      .max(15, "Max length is 15"),
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[1250][0-9]{8}$/, "Phone is not valid"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z](?=.*[!@#$%])[a-z0-9!@#$%]{6,24}$/,
        "Password is not valid"
      ),
    rePassword: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      iAgree: false,
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  });

  return (
    <div>
      <section className="bg-light p-3 p-md-4 p-xl-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
              <div className="card border border-light-subtle rounded-4">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-5">
                        <h2 className="h4 text-center">Registration</h2>
                        <h3 className="fs-6 fw-normal text-secondary text-center m-0">
                          Enter your details to register
                        </h3>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={formik.handleSubmit} action="#!">
                    <div className="row gy-3 overflow-hidden">
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            className={`form-control ${
                              formik.touched.name && formik.errors.name
                                ? "is-invalid"
                                : ""
                            }`}
                            name="name"
                            value={formik.values.name}
                            id="name"
                            placeholder="Last Name"
                            required
                          />
                          <label htmlFor="name" className="form-label">
                            Name
                          </label>
                          {formik.touched.name && formik.errors.name ? (
                            <div className="text-danger">
                              {formik.errors.name}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="email"
                            className="form-control"
                            name="email"
                            value={formik.values.email}
                            id="email"
                            placeholder="name@example.com"
                            required
                          />
                          <label htmlFor="email" className="form-label">
                            Email
                          </label>
                          {formik.touched.email && formik.errors.email ? (
                            <div className="text-danger">
                              {formik.errors.email}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="password"
                            className="form-control"
                            name="password"
                            value={formik.values.password}
                            id="password"
                            placeholder="Password"
                            required
                          />
                          <label htmlFor="password" className="form-label">
                            Password
                          </label>
                          {formik.touched.password && formik.errors.password ? (
                            <div className="text-danger">
                              {formik.errors.password}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="password"
                            className="form-control"
                            name="rePassword"
                            value={formik.values.rePassword}
                            id="rePassword"
                            placeholder="Re-enter Password"
                            required
                          />
                          <label htmlFor="rePassword" className="form-label">
                            Re-enter Password
                          </label>
                          {formik.touched.rePassword &&
                          formik.errors.rePassword ? (
                            <div className="text-danger">
                              {formik.errors.rePassword}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="tel"
                            className="form-control"
                            name="phone"
                            value={formik.values.phone}
                            id="phone"
                            placeholder="Phone"
                            required
                          />
                          <label htmlFor="phone" className="form-label">
                            Phone
                          </label>
                          {formik.touched.phone && formik.errors.phone ? (
                            <div className="text-danger">
                              {formik.errors.phone}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="iAgree"
                            id="iAgree"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.iAgree}
                          />
                          <label
                            className="form-check-label text-secondary"
                            htmlFor="iAgree"
                          >
                            I agree to the{" "}
                            <Link
                              href="#!"
                              className="link-primary text-decoration-none"
                            >
                              terms and conditions
                            </Link>
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-grid">
                          <button
                            className="btn bsb-btn-xl btn-primary"
                            type="submit"
                            disabled={!formik.isValid}
                          >
                            Sign up
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="row">
                    <div className="col-12">
                      <hr className="mt-5 mb-4 border-secondary-subtle" />
                      <p className="m-0 text-secondary text-center">
                        Already have an account?{" "}
                        <Link
                          href="#!"
                          className="link-primary text-decoration-none"
                          onClick={() => navigate("/Login")}
                        >
                          Sign in
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <p className="mt-5 mb-5">Or continue with</p>
                      <div className="d-flex gap-2 gap-sm-3 justify-content-center">
                        <Link
                          href="#!"
                          className="btn btn-lg btn-outline-danger p-3 lh-1"
                        >
                          <i className="fa-brands fa-google"></i>
                        </Link>
                        <Link
                          href="#!"
                          className="btn btn-lg btn-outline-primary p-3 lh-1"
                        >
                          <i className="fa-brands fa-facebook"></i>
                        </Link>
                        <Link
                          href="#!"
                          className="btn btn-lg btn-outline-dark p-3 lh-1"
                        >
                          <i className="fa-brands fa-x-twitter"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
