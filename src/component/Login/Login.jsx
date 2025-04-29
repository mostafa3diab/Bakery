import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../context/userContext";
import "./Login.css";

function Login() {
  let { isLogin, setLogin } = useContext(userContext);

  let navigate = useNavigate();
  async function handleLogin(formsData) {
    console.log("login", formsData);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", formsData)

      .then((response) => {
        console.log("success", response);
        if (response.data.message === "success") {
          localStorage.setItem("userToken", response.data.token);
          setLogin(response.data.token);
          console.log(isLogin);
          navigate("/"); //programmatic routing
        }
      })

      .catch((error) => {
        console.log("error", error);
      });
  }

  // validation
  let validationSchema = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("enter valid email"), //check on email
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

  // const handleLogin = async (values) => {
  //   try {
  //     const response = await axios.post(
  //       "https://ecommerce.routemisr.com/api/v1/auth/signin",
  //       values
  //     );

  //     if (response.data.message === "success") {
  //       // Store token in local storage or context
  //       localStorage.setItem("token", response.data.token);
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     // Enhanced error handling
  //     if (error.response?.data?.message === "Incorrect email or password") {
  //       formik.setFieldError("email", "Invalid credentials");
  //       formik.setFieldError("password", "Invalid credentials");
  //     } else {
  //       alert("An error occurred. Please try again later.");
  //     }
  //   }
  // };

  // Add to useEffect
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

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
                        <h2 className="h4 text-center">Login</h2>
                        <h3 className="fs-6 fw-normal text-secondary text-center m-0">
                          Enter your credentials to continue
                        </h3>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={formik.handleSubmit}>
                    <div className="row gy-3 overflow-hidden">
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="email"
                            className={`form-control ${
                              formik.touched.email && formik.errors.email
                                ? "is-invalid"
                                : ""
                            }`}
                            name="email"
                            id="email"
                            placeholder="name@example.com"
                          />
                          <label htmlFor="email" className="form-label">
                            Email
                          </label>
                          {formik.touched.email && formik.errors.email && (
                            <div className="text-danger">
                              {formik.errors.email}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="password"
                            className={`form-control ${
                              formik.touched.password && formik.errors.password
                                ? "is-invalid"
                                : ""
                            }`}
                            name="password"
                            id="password"
                            placeholder="Password"
                          />
                          <label htmlFor="password" className="form-label">
                            Password
                          </label>
                          {formik.touched.password &&
                            formik.errors.password && (
                              <div className="text-danger">
                                {formik.errors.password}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-grid">
                          <button
                            className="btn bsb-btn-xl btn-primary"
                            type="submit"
                            disabled={!formik.isValid || formik.isSubmitting}
                          >
                            {formik.isSubmitting ? "Logging in..." : "Login"}
                          </button>
                        </div>
                        <div className="text-center mt-3">
                          Don't have an account?{" "}
                          <Link
                            href="#!"
                            className="link-primary text-decoration-none"
                            onClick={() => navigate("/Register")}
                          >
                            Register here
                          </Link>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="row">
                    <div className="col-12">
                      <hr className="mt-5 mb-4 border-secondary-subtle" />
                      <p className="m-0 text-secondary text-center">
                        Forgot password?{" "}
                        <Link
                          href="#!"
                          className="link-primary text-decoration-none"
                        >
                          Reset it here
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <p className="mt-5 mb-5">Or continue with</p>
                      <div className="d-flex gap-2 gap-sm-3 justify-content-center">
                        <button
                          className="btn btn-lg btn-outline-danger p-3 lh-1"
                          type="button"
                        >
                          <i className="fa-brands fa-google"></i>
                        </button>
                        <button
                          className="btn btn-lg btn-outline-primary p-3 lh-1"
                          type="button"
                        >
                          <i className="fa-brands fa-facebook"></i>
                        </button>
                        <button
                          className="btn btn-lg btn-outline-dark p-3 lh-1"
                          type="button"
                        >
                          <i className="fa-brands fa-x-twitter"></i>
                        </button>
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

export default Login;
