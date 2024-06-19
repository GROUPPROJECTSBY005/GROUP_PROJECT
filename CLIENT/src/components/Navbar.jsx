import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import Swal from "sweetalert2";

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    Swal.fire({
        icon: "success",
        title: "Success",
        text: "Kamu telah berhasil logout",
      });
    navigate("/");
  };

  return (
    <>
      <nav class="navbar navbar-light bg-body-tertiary shadow p-3">
        <div class="container-fluid">
          <Link to={"/"}>
            <span class="navbar-brand mb-0 h1">Hacktip</span>
          </Link>
          <div className="d-flex gap-2">
            {isAuthenticated ? (
              <>
                <button className="btn btn-outline-dark" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to={"/register"}>
                  <button className="btn btn-outline-dark">Register</button>
                </Link>
                <Link to={"/login"}>
                  <button className="btn btn-outline-dark">Login</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
