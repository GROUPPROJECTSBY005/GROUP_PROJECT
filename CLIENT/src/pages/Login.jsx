import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../src/axiosInstance/axiosInstance";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Login() {
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const changeHandler = (el) => {
    const { name, value } = el.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const submitHandler = async (el) => {
    el.preventDefault();

    try {
      const { data } = await axios.post("/login", loginForm);
      localStorage.username = loginForm.username
      login(data.access_token);
      Swal.fire({
        icon: "success",
        title: "Success Login",
        confirmButtonColor: "#198754",
      });

      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response.data.message,
        confirmButtonColor: "#198754",
      });
    }
  };
  return (
    <>
      <Navbar />
      <section className="h-100">
        <div className="container h-100">
          <div className="row justify-content-sm-center h-100">
            <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
              <div className="text-center my-5">
                <img src="/haktipgems.svg" alt="logo" width={125} />
              </div>
              <div className="card shadow-lg">
                <div className="card-body p-5">
                  <h1 className="fs-4 card-title fw-bold mb-4">Login</h1>
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
                        required
                        onChange={changeHandler}
                      />
                      <div className="invalid-feedback">
                        Username is invalid
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="mb-2 w-100">
                        <label className="text-muted" htmlFor="password">
                          Password
                        </label>
                      </div>
                      <input
                        id="password"
                        type="password"
                        className="form-control"
                        name="password"
                        required
                        onChange={changeHandler}
                      />
                      <div className="invalid-feedback">
                        Password is required
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          name="remember"
                          id="remember"
                          className="form-check-input"
                        />
                        <label htmlFor="remember" className="form-check-label">
                          Remember Me
                        </label>
                      </div>
                      <button type="submit" className={`btn ms-auto ${isDarkMode ? 'btn-dark' : 'btn-success'}`}>
                        Login
                      </button>
                    </div>
                  </form>
                </div>
                <div className="card-footer py-3 border-0">
                  <div className="text-center">
                    Don't have an account?{" "}
                    <Link to="/register" className={isDarkMode ? "text-dark" : "text-success"}>
                      Create One
                    </Link>
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
