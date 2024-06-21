import { createBrowserRouter, Outlet, redirect } from "react-router-dom";
import Swal from "sweetalert2";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Canvas from "./pages/CanvasGame";
import EnterGame from "./pages/Entergame";
import DrawingGame from "./pages/DarwingGame";
import TugOfWar from "./pages/TugOfWar";
import KosonganGame from "./components/KosonganGame";
import Kosongan from "./pages/Kosongan";
import Dotgame from "./pages/DotGame";
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
    path: "/drawinggame",
    element: <DrawingGame />,
    loader: checkAccess,
  },
  {
    path: "/tugofwar",
    element: <TugOfWar />,
    loader: checkAccess,
  },
  {
    path: "/kosongan",
    element: <Kosongan />,
    loader: checkAccess,
  },
  {
    path: "/game",
    element: <Game />,
    loader: checkAccess,
  },
  {
    path: "/canvas",
    element: <Canvas />,
    loader: checkAccess,
  },
  {
    path: "/dotgame",
    element: <Dotgame />,
    loader: checkAccess,
  },
  {
    path: "/entergame",
    element: <EnterGame />,
    loader: checkAccess,
  }
]);

export default router;
