import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../context/userContext";
import "./Login.css";
import logo from "../../assets/images/login.png"; // Update path as needed

function Login() {
  let { isLogin, setLogin } = useContext(userContext);
  let navigate = useNavigate();

  async function handleLogin(formsData) {
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", formsData)
      .then((response) => {
        if (response.data.message === "success") {
          localStorage.setItem("userToken", response.data.token);
          setLogin(response.data.token);
          navigate("/");
        }
      })
      .catch((error) => {
        // Handle error (show message, etc.)
      });
  }

  let validationSchema = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("enter valid email"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^[A-Z](?=.*[!@#$%])[a-z0-9!@#$%]{6,24}$/,
        "password is not valid"
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleLogin,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <section className="p-3 p-md-4 p-xl-5">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 bsb-tpl-bg-platinum d-flex flex-column justify-content-between h-100 p-3 p-md-4 p-xl-5">
            <h3 className="m-0">Welcome!</h3>
            <img
              className="img-fluid rounded mx-auto my-4"
              loading="lazy"
              src={logo}
              width="100%"
              height="80"
              alt="BootstrapBrain Logo"
            />
          </div>
          <div className="col-12 col-md-6 bsb-tpl-bg-lotion" bg>
            <div className="p-3 p-md-4 p-xl-5">
              <div className="row">
                <div className="col-12">
                  <div className="mb-5">
                    <h3>Log in</h3>
                  </div>
                </div>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="row gy-3 gy-md-4 overflow-hidden">
                  <div className="col-12">
                    <label htmlFor="email" className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className={`form-control ${
                        formik.touched.email && formik.errors.email
                          ? "is-invalid"
                          : ""
                      }`}
                      name="email"
                      id="email"
                      placeholder="name@example.com"
                      required
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-danger">{formik.errors.email}</div>
                    )}
                  </div>
                  <div className="col-12">
                    <label htmlFor="password" className="form-label">
                      Password <span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      className={`form-control ${
                        formik.touched.password && formik.errors.password
                          ? "is-invalid"
                          : ""
                      }`}
                      name="password"
                      id="password"
                      required
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <div className="text-danger">
                        {formik.errors.password}
                      </div>
                    )}
                  </div>
                  <div className="col-12">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        name="remember_me"
                        id="remember_me"
                      />
                      <label
                        className="form-check-label text-secondary"
                        htmlFor="remember_me"
                      >
                        Keep me logged in
                      </label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-grid">
                      <button
                        className="btn bsb-btn-xl btn-primary"
                        type="submit"
                        disabled={!formik.isValid || formik.isSubmitting}
                      >
                        {formik.isSubmitting ? "Logging in..." : "Log in now"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div className="row">
                <div className="col-12">
                  <hr className="mt-5 mb-4 border-secondary-subtle" />
                  <div className="d-flex justify-content-between">
                    <p className="mb-0">
                      Not a member yet?{" "}
                      <span
                        className="link-secondary text-decoration-none"
                        role="button"
                        onClick={() => navigate("/Register")}
                      >
                        Register now
                      </span>
                    </p>
                    <span
                      className="link-secondary text-decoration-none"
                      role="button"
                      onClick={() => {
                        // Implement forgot password navigation
                      }}
                    >
                      Forgot password
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <p className="mt-5 mb-4">Or sign in with</p>
                  <div className="d-flex gap-3 flex-column flex-xl-row">
                    <button
                      className="btn bsb-btn-xl btn-outline-primary"
                      type="button"
                    >
                      {/* Google SVG */}
                      <i className="fa-brands fa-google"></i>
                      <span className="ms-2 fs-6">Google</span>
                    </button>
                    <button
                      className="btn bsb-btn-xl btn-outline-primary"
                      type="button"
                    >
                      {/* Facebook SVG */}
                      <i className="fa-brands fa-facebook"></i>
                      <span className="ms-2 fs-6">Facebook</span>
                    </button>
                    <button
                      className="btn bsb-btn-xl btn-outline-primary"
                      type="button"
                    >
                      {/* Twitter SVG */}
                      <i className="fa-brands fa-x-twitter"></i>
                      <span className="ms-2 fs-6">Twitter</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
