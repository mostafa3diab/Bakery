import React from "react";
import contactUs from "./../../assets/images/contactUs.jpg";

function Contact() {
  return (
    <>
      <section id="Contact_us">
        <div className="contactus mb-5">
          <div className="container">
            <div className="row my-3">
              <div className="col-md-6">
                <div>
                  <h2 className="my-5">
                    Handling the stress so your event is a success{" "}
                  </h2>
                  <p>
                    Sed lectus ultricies id id massa tellus. Gravida ullamcorper
                    lectus vitae tristique cursus tempor rutrum
                  </p>
                  <div className="contact row m-3">
                    <div className="col-md-6 my-5">
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-phone"></i>
                        <div className="mx-4">
                          <p>phone</p>
                          <p>(+20)1234567891</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 my-5">
                      <div className="d-flex align-items-center">
                        <i className="fa-regular fa-envelope"></i>
                        <div className="mx-4">
                          <p>Email</p>
                          <p>EcommerceApp@gmail.com</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <img
                      src={contactUs}
                      alt="contactus"
                      width="80%"
                      height="415"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6 bg-light mt-5 p-5">
                <div>
                  <h3>Send Us a message</h3>
                  <p>
                    Sed lectus ultricies id id massa tellus. Gravida ullamcorper
                    lectus vitae tristique cursus tempor rutrum
                  </p>
                  <div className="form">
                    <form action="">
                      <div className="form-floating my-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          placeholder="Name"
                          required
                        />
                        <label htmlFor="floatingInput">Name</label>
                      </div>
                      <div className="form-floating my-3">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          id="floatingEmail"
                          placeholder="Email"
                          required
                        />
                        <label htmlFor="floatingEmail">Email</label>
                      </div>
                      <div className="form-floating my-3">
                        <input
                          type="tel"
                          className="form-control"
                          name="phone"
                          id="floatingNumber"
                          placeholder="Number"
                          required
                        />
                        <label htmlFor="floatingNumber">Number</label>
                      </div>
                      <div className="form-floating my-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingSubject"
                          placeholder="Subject"
                          required
                        />
                        <label htmlFor="floatingSubject">Subject</label>
                      </div>
                      <div className="form-floating my-3">
                        <textarea
                          className="form-control"
                          placeholder="Leave a comment here"
                          id="floatingTextarea2"
                          style={{ height: "100px" }}
                        ></textarea>
                        <label htmlFor="floatingTextarea2">Comments</label>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg mt-5"
                      >
                        <i className="fa-regular fa-envelope me-3"></i>Send
                        Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
