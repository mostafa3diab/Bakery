import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../context/userContext";
import img from "../../assets/images/login.png";

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
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12 col-xxl-11">
              <div className="card border-light-subtle shadow-sm">
                <div className="row g-0">
                  <div className="col-12 col-md-6">
                    <img
                      className="img-fluid rounded-start w-100 h-100 object-fit-cover"
                      loading="lazy"
                      src={img}
                      alt="Welcome back you've been missed!"
                    />
                  </div>
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <div className="col-12 col-lg-11 col-xl-10">
                      <div className="card-body p-3 p-md-4 p-xl-5">
                        <div className="row">
                          <div className="col-12">
                            <div className="mb-5">
                              <h2 className="h4 text-center">Registration</h2>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <div className="d-flex gap-3 flex-column">
                              <a
                                href="#!"
                                className="btn btn-lg btn-outline-dark"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-google"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                                </svg>
                                <span className="ms-2 fs-6">
                                  Log in with Google
                                </span>
                              </a>
                            </div>
                            <p className="text-center mt-4 mb-5">
                              Or enter your details to register
                            </p>
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
                                <label
                                  htmlFor="password"
                                  className="form-label"
                                >
                                  Password
                                </label>
                                {formik.touched.password &&
                                formik.errors.password ? (
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
                                <label
                                  htmlFor="rePassword"
                                  className="form-label"
                                >
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
                            <p className="mb-0 mt-5 text-secondary text-center">
                              Already have an account?{" "}
                              <Link
                                to="/login"
                                className="link-primary text-decoration-none"
                              >
                                Sign in
                              </Link>
                            </p>
                          </div>
                        </div>
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
