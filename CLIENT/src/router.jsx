import { createBrowserRouter, Outlet, redirect } from "react-router-dom";
import Swal from "sweetalert2";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import TestAirHockey from "./pages/TestAirHockey";

const checkAccess = () => {
  if (!localStorage.access_token) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You must login first!",
      confirmButtonColor: "#198754",
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
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
    loader: checkLogin,
  },

  {
    path: "/login",
    element: <Login />,
    loader: checkLogin,
  },

  // authentication
  {
    path: "/game",
    element: <Game />,
    loader: checkAccess,
  },
  {
    path: "/testairhockey",
    element: <TestAirHockey />,
    loader: checkAccess,
  },
]);

export default router;
