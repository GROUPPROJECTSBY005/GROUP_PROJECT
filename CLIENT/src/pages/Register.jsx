import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../src/axiosInstance/axiosInstance";
import Swal from "sweetalert2";

export default function Register() {
    const [registerForm, setRegisterForm] = useState({
        username: "",
        password: "",
      });
    
      const navigate = useNavigate();
    
      const changeHandler = (el) => {
        const { name, value } = el.target;
    
        setRegisterForm({
          ...registerForm,
          [name]: value,
        });
      };
    
      const submitHandler = async (el) => {
        el.preventDefault();
    
        try {
          await axios.post("/register", registerForm);
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            text: 'You can login now!.'
          });
          navigate("/login");
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: error.response.data.message
          });
        }
      };
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="author" content="Hacktip Games" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <section className="h-100">
        <div className="container h-100">
          <div className="row justify-content-sm-center h-100">
            <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
              <div className="text-center my-5">
                <img
                  src="../../public/haktipgems.svg"
                  alt="logo"
                  width={125}
                />
              </div>
              <div className="card shadow-lg">
                <div className="card-body p-5">
                  <h1 className="fs-4 card-title fw-bold mb-4">Register</h1>
                  <form
                    method="POST"
                    className="needs-validation"
                    noValidate=""
                    autoComplete="off"
                    onSubmit={submitHandler}
                  >
                    <div className="mb-3">
                      <label className="mb-2 text-muted" htmlFor="username">
                        Username
                      </label>
                      <input
                        id="username"
                        type="text"
                        className="form-control"
                        name="username"
                        defaultValue=""
                        required=""
                        autoFocus=""
                        onChange={changeHandler}
                      />
                      <div className="invalid-feedback">Username is required</div>
                    </div>
                    <div className="mb-3">
                      <label className="mb-2 text-muted" htmlFor="password">
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        className="form-control"
                        name="password"
                        required=""
                        onChange={changeHandler}
                      />
                      <div className="invalid-feedback">
                        Password is required
                      </div>
                    </div>
                    <p className="form-text text-muted mb-3">
                      By registering you agree with our terms and condition.
                    </p>
                    <div className="align-items-center d-flex">
                      <button type="submit" className="btn btn-primary ms-auto">
                        Register
                      </button>
                    </div>
                  </form>
                </div>
                <div className="card-footer py-3 border-0">
                  <div className="text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue">
                      Login
                    </Link>
                  </div>
                </div>
              </div>
              <div className="text-center mt-5 text-muted">
                Copyright © 2017-2024 — Hacktip Games
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
