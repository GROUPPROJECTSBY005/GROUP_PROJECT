import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Home() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <>
      <Navbar />
      <div
        className={`game-background ${isDarkMode ? "dark-mode" : "light-mode"}`}
      ></div>
      <div className="container mt-5">
        <h1
          className={`text-center my-4 ${
            isDarkMode ? "text-light" : "text-dark"
          }`}
        >
          Games Portal
        </h1>
        <hr className="mb-4" />
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div
              className={`card border-3 rounded-5 ${
                isDarkMode
                  ? "bg-dark text-light border-dark"
                  : "bg-light text-dark border-success"
              }`}
            >
              <div className="image-container">
                <img
                  src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2473980/header.jpg"
                  className="card-img-top border-1 rounded-5"
                  alt="Hollywood Sign on The Hill"
                />
                <span className="badge text-bg-warning p-3 rounded-5">
                  Multiplayer
                </span>
              </div>
              <div className="card-body">
                <h5 className="card-title">Drawing Together</h5>
                <p className="card-text">
                  Collaborative drawing game allows multiple players to create
                  artwork together in real-time. Players can join a virtual
                  canvas, draw simultaneously, and see each other's
                  contributions instantly.
                </p>
                <Link to="/DrawingGame">
                  <button
                    className={`btn ${
                      isDarkMode ? "btn-outline-light" : "btn-success"
                    } border-3 btn-lg container-fluid rounded-5`}
                  >
                    Play now!
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div
              className={`card border-3 rounded-5 ${
                isDarkMode
                  ? "bg-dark text-light border-dark"
                  : "bg-light text-dark border-success"
              }`}
            >
              <div className="image-container">
                <img
                  src="https://play-lh.googleusercontent.com/v3gJCeTEQsbjKm30dmb7sVMxxDsnSTVJN56FLQ6Tn70dCO4phn8RqkkrSCSnynytHzc"
                  className="card-img-top rounded-5"
                  alt="Hollywood Sign on The Hill"
                />
                <span className="badge text-bg-warning p-3 rounded-5">
                  Multiplayer
                </span>
              </div>
              <div className="card-body">
                <h5 className="card-title">Tug Of War</h5>
                <p className="card-text">
                  The online Tug of War game brings a classic playground contest
                  into the digital age, allowing players to compete from the
                  comfort of their own homes. In this multiplayer game.
                </p>
                <Link to="/tugofwar">
                  <button
                    className={`btn ${
                      isDarkMode ? "btn-outline-light" : "btn-success"
                    } border-3 btn-lg container-fluid rounded-5`}
                  >
                    Play now!
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
          <div
              className={`card border-3 rounded-5 coming-soon shadow ${
                isDarkMode ? "bg-dark text-light boder-dark" : "bg-light text-dark border-secondary-subtle"
              }`}
            >
              <div className="image-container">
                <img
                  src="/airhockey.jpeg"
                  className="card-img-top rounded-5"
                  alt="Hollywood Sign on The Hill"
                />
                <span className="badge text-bg-warning p-3 rounded-5">
                  Multiplayer
                </span>
              </div>
              <div className="card-body">
                <h5 className="card-title">Air Hockey</h5>
                <p className="card-text">
                  Dive into thrilling multiplayer Air Hockey! Challenge friends
                  or global players in fast-paced matches with stunning graphics
                  and smooth controls. Ready to be the ultimate champion?
                </p>
                <button className="btn border-dark-subtle border-3 disabled btn-lg container-fluid rounded-5">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
          <div className="col">
            <div
              className={`card border-3 rounded-5 coming-soon shadow ${
                isDarkMode ? "bg-dark text-light boder-dark" : "bg-light text-dark border-secondary-subtle"
              }`}
            >
              <div className="image-container">
                <img
                  src="/tictactoe1.png"
                  className="card-img-top rounded-5"
                  alt="Hollywood Sign on The Hill"
                />
                <span className="badge text-bg-warning p-3 rounded-5">
                  Multiplayer
                </span>
              </div>
              <div className="card-body">
                <h5 className="card-title">Tic Tac Toe</h5>
                <p className="card-text">
                  Engage in classic Tic Tac Toe duels! Challenge friends or
                  opponents worldwide in strategic matches. Simple yet addictive
                  gameplay with smooth online play. Are you the Tic Tac Toe
                  master?
                </p>
                <button className="btn border-dark-subtle border-3 disabled btn-lg container-fluid rounded-5">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
          <div className="col">
          <div
              className={`card border-3 rounded-5 coming-soon shadow ${
                isDarkMode ? "bg-dark text-light boder-dark" : "bg-light text-dark border-secondary-subtle"
              }`}
            >
              <div className="image-container">
                <img
                  src="/darts.jpg"
                  className="card-img-top rounded-5"
                  alt="Hollywood Sign on The Hill"
                />
                <span className="badge text-bg-warning p-3 rounded-5">
                  Multiplayer
                </span>
              </div>
              <div className="card-body">
                <h5 className="card-title">Multiplayer Darts</h5>
                <p className="card-text">
                  Test your aim in thrilling Darts matches! Challenge friends or
                  international opponents with realistic gameplay and smooth
                  controls. Who will hit the bullseye?
                </p>
                <button className="btn border-dark-subtle border-3 disabled btn-lg container-fluid rounded-5">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
