import { createBrowserRouter, Outlet, redirect } from "react-router-dom";
import Swal from 'sweetalert2'
import Home from "./pages/Home";
import Game from "./pages/Game";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

const checkAccess = () => {
  if (!localStorage.access_token) {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Kamu harus login untuk memainkan games!",
      });
    return redirect("/login");
  }
  return null;
};

const checkLogin = () => {
  if (localStorage.access_token) {
    return redirect("/");
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: "/register",
    element: (
      <>
        <Navbar />
        <Register />
      </>
    ),
    loader: checkLogin,
  },

  {
    path: "/login",
    element: (
      <>
        <Navbar />
        <Login />
      </>
    ),
    loader: checkLogin,
  },

  // authentication
  {
    path: "/game",
    element: (
      <>
        <Navbar />
        <Game />
      </>
    ),
    loader: checkAccess,
  },
]);

export default router;
