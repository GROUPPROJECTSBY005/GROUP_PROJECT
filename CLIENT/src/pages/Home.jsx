import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center my-4">Games</h1>
        <hr className="mb-4"/>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          <div className="col">
            <div className="card border-success border-3 rounded-5">
              <div className="image-container">
                <img
                  src="/hockey.jpg"
                  className="card-img-top rounded-5"
                  alt="Hollywood Sign on The Hill"
                />
                <span class="badge text-bg-warning p-3 rounded-5 fs-6">Multiplayer</span>
              </div>
              <div className="card-body">
                <h5 className="card-title">Air Hockey</h5>
                <p className="card-text">
                  Dive into thrilling multiplayer Air Hockey! Challenge friends
                  or global players in fast-paced matches with stunning graphics
                  and smooth controls. Ready to be the ultimate champion?
                </p>
                <Link to={"/game"}>
                  <button className="btn btn-success border-3 btn-lg container-fluid rounded-5">
                    Play Now!
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card border-secondary-subtle border-3 rounded-5 coming-soon">
              <div className="image-container">
                <img
                  src="/tictactoe1.png"
                  className="card-img-top rounded-5"
                  alt="Hollywood Sign on The Hill"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Tic Tac Toe</h5>
                <p className="card-text">
                Engage in classic Tic Tac Toe duels! Challenge friends or opponents worldwide in strategic matches. Simple yet addictive gameplay with smooth online play. Are you the Tic Tac Toe master?
                </p>
                <button className="btn border-dark-subtle border-3 disabled btn-lg container-fluid rounded-5">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card border-secondary-subtle border-3 rounded-5 coming-soon">
              <div className="image-container">
                <img
                  src="/ping.png"
                  className="card-img-top rounded-5"
                  alt="Hollywood Sign on The Hill"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Ping Pong</h5>
                <p className="card-text">
                Step into the virtual arena for intense Ping Pong battles! Play against friends or global rivals with lifelike physics and responsive controls. Can you master the table?
                </p>
                <button className="btn border-dark-subtle border-3 disabled btn-lg container-fluid rounded-5">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card border-secondary-subtle border-3 rounded-5 coming-soon">
              <div className="image-container">
                <img
                  src="https://via.placeholder.com/300"
                  className="card-img-top rounded-5"
                  alt="Hollywood Sign on The Hill"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Multiplayer Darts</h5>
                <p className="card-text">
                Test your aim in thrilling Darts matches! Challenge friends or international opponents with realistic gameplay and smooth controls. Who will hit the bullseye?


                </p>
                <button className="btn border-dark-subtle border-3 disabled btn-lg container-fluid rounded-5">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card border-secondary-subtle border-3 rounded-5 coming-soon">
              <div className="image-container">
                <img
                  src="https://via.placeholder.com/300"
                  className="card-img-top rounded-5"
                  alt="Hollywood Sign on The Hill"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Pool</h5>
                <p className="card-text">
                Enter the virtual pool hall for exciting 8-ball and 9-ball games! Face off against global players with realistic graphics and intuitive controls. Will you sink the winning shot?
                </p>
                <button className="btn border-dark-subtle border-3 disabled btn-lg container-fluid rounded-5">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card border-secondary-subtle border-3 rounded-5 coming-soon">
              <div className="image-container">
                <img
                  src="https://via.placeholder.com/300"
                  className="card-img-top rounded-5"
                  alt="Hollywood Sign on The Hill"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <button className="btn border-dark-subtle border-3 disabled btn-lg container-fluid rounded-5">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card border-secondary-subtle border-3 rounded-5 coming-soon">
              <div className="image-container">
                <img
                  src="https://via.placeholder.com/300"
                  className="card-img-top rounded-5"
                  alt="Hollywood Sign on The Hill"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
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
