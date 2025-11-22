import React from "react";

export default function Footer() {
  return (
    <footer className="text-center text-lg-start text-muted bg-light w-100">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href="#!" className="me-4 text-reset">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#!" className="me-4 text-reset">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#!" className="me-4 text-reset">
            <i className="fab fa-google"></i>
          </a>
          <a href="#!" className="me-4 text-reset">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#!" className="me-4 text-reset">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#!" className="me-4 text-reset">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </section>

      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>Fresh Cart
              </h6>
              <p>
                modern, responsive e-commerce web application designed to
                provide a seamless online shopping experience for groceries and
                daily essentials. The platform allows users to browse, search,
                and filter products efficiently, view detailed product
                information, and make secure purchases with ease
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p>
                <a href="https://nextjs.org/" className="text-reset">
                  Next
                </a>
              </p>
              <p>
                <a href="https://react.dev/" className="text-reset">
                  React
                </a>
              </p>
              <p>
                <a
                  href="https://react-bootstrap.netlify.app/"
                  className="text-reset"
                >
                  Bootstrap
                </a>
              </p>
              <p>
                <a
                  href="https://tanstack.com/query/latest"
                  className="text-reset"
                >
                  Tanstack
                </a>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <i className="fas fa-home me-2"></i>Cairo,Egypt
              </p>
              <p>
                <i className="fas fa-envelope me-3"></i>
                Mohaamedhassabo26@gmail.com
              </p>
              <p>
                <i className="fas fa-phone me-3"></i>+20 01014625009
              </p>
            </div>
          </div>
        </div>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2021 Copyright:
        <a
          className="text-success fw-bold"
          target="_blank"
          href="https://www.linkedin.com/in/mohammed-hassabo-2a010020a/"
        >
          By Muhammedhsbo
        </a>
      </div>
    </footer>
  );
}
