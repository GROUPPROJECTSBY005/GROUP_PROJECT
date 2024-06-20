export default function TestAirHockey() {
  return (
    <>
      <div className="container">
        <h1>Ice Hockey!</h1>
        <p id="serverInfo">
          Please enter a username to connect to another player.
        </p>
        <p id="joinForm">
          <label htmlFor="user">Username:</label>
          <input id="username" name="user" type="text" />
          <input id="connect" type="button" defaultValue="connect" />
        </p>
        <div id="canvasContainer">
          <canvas width={1280} height={800}>
            Please update to an HTML5 compatible web browser :
          </canvas>
        </div>
      </div>
    </>
  );
}
