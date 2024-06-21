import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";
import Swal from "sweetalert2";

export default function Navbar() {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useContext(AuthContext);
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    const handleLogout = () => {
        logout();
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "You have successfully logged out",
            confirmButtonColor: "#198754"
        });
        navigate("/");
    };

    return (
        <>
            <nav className={`navbar ${isDarkMode ? 'navbar-dark bg-dark' : 'navbar-dark bg-success'} shadow p-3`}>
                <div className="container-fluid">
                    <Link to={"/"}>
                        <span className="navbar-brand mb-0 h1 fs-3">Hacktip Games</span>
                    </Link>
                    <div className="d-flex gap-3">
                        <button className="btn btn-outline-light" onClick={toggleTheme}>
                            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                        </button>
                        {isAuthenticated ? (
                            <button className="btn fs-5 btn-outline-light" onClick={handleLogout}>
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link to={"/register"}>
                                    <button className="btn fs-5 btn-outline-light">Register</button>
                                </Link>
                                <Link to={"/login"}>
                                    <button className="btn fs-5 btn-outline-light">Login</button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}
