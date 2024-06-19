export default function Game() {


    (function() {
			
        // Where we'll store the canvas and its context
        var canvas;
        var ctx;
        
        // The offscreen canvas, for buffering image data
        var bufferCanvas;
        var bufferCtx;
        
        // Other various DOM and screen elements used for gameplay/server feedback
        var serverInfo;
        var notification;
        
        // Game variables
        var socket; // the user's socket
        var side = {		// which side the player will be on - left (0) or right (1)
            is: 0
        }
        var user = {	// info about the user
            username: "",
            pos: {
                x: 0,
                y: 0
            },
            points: 0,
            img: new Image()
        };
        var otherUser = { // info about the other enemy user
            username: "",
            pos: {
                x: -64,
                y: -64
            },
            points: 0,
            img: new Image(),
            lastTime: new Date().getTime()
        };
        var puck = { // info about the puck
            pos: {
                x: 640,
                y: 400 
            },
            vel: {
                x: 0,
                y: 0
            },
            img: new Image(),
            radius: 25,
            lastTime: new Date().getTime()
        };
        
        // Connects to the socket.io server
        // Sets up socket event delegates for server communication
        function connectSocket(e) {
        
            // Connect to socket.io
            // The io variable is a global var from the socket.io script above
            socket = io.connect();
            
            // emit our starting positipon
            socket.emit("update", {pos: user.pos})
        
            // Listen for drawImg calls, which are emitted when a new user connects
            socket.on("msg", function(data) {
                serverInfo.innerHTML = data.msg;
            });
        
            // Listener for user connection event
            socket.on("connect", function(){
                console.log("Connecting...");
                
                // retrieve the username from the entry field to send to server
                user.username = document.querySelector('#username').value;
                
                // for invalid entries, generate a random username
                if (!user.username || user.username === "") {
                    user.username = 'user' + Math.floor(Math.random()*1000000);
                }
                
                socket.emit("join", { name: user.username });
            });
            
            // Listen for update data sent from the GameManager
            socket.on("updateInfo", function(data) {
                // GameManager tells us which object it's updating in data.object
                switch (data.object) {
                    // add all the sent keys to our userdata
                    case "user":
                        if (data.pos) {
                            user.pos = data.pos;
                        }
                        if (data.side) {
                            side.is = data.side;
                            Object.freeze(side);
                        }
                        if (data.username) {
                            user.username = data.username;
                        }
                        break;
                    case "otherUser":
                        // only update other user if the new data is more recent
                        if (data.time > otherUser.lastTime) {
                            if (data.pos) {
                                otherUser.pos = data.pos;
                            }
                            if (data.username) {
                                otherUser.username = data.username;
                            }
                            
                            // update their last updated time to this packet's time
                            otherUser.lastTime = data.time;
                        }
                        break;
                    case "puck":
                        // only update puck if the new data is more recent
                        if (data.time > puck.lastTime) {
                            puck.pos = data.pos;
                            puck.vel = data.vel;
                            
                            // update the puck's updated time to this packet's time
                            puck.lastTime = data.time;
                        }
                        break;
                }
            });
        
            // Listen for the server telling us someone scored a point
            socket.on("scorePoint", function(data) {
                // data.side says which side was scored on
                // in this case, we lost the point
                if (data.side === side.is) {
                    ++otherUser.points;
                }
                // not scored in our goal - we must have scored it
                else {
                    ++user.points;
                }
            });
            
            // Listen for a successful join, and hide the connection buttons
            socket.on("joinSuccess", function() {
                document.querySelector('#joinForm').style.display = "none";
            });
            
            // Listen for a "screen notification" from the server, which displays on the canvas
            // Notification deletes after the amount of time passed in the function
            socket.on("notify", function(data) {
                // update the global notification
                notification = data.msg;
                
                // if the server sends a <= 0 duration, it's permanent
                if (data.duration > 0) {
                    // reset the notification after the duration ends
                    setTimeout(function(currentNotif) {
                        // delete the notification if it hasn't been overwritten
                        if (notification === data.msg) {
                            notification = "";
                        }
                        
                    }, data.duration);
                }
            });
            
            // Listen for the server telling us to begin the game
            socket.on("beginPlay", update);
        }
        
        // A helper function for updating positions
        // Returns value clamped within min and max
        function clamp(val, min, max) {
            return Math.max(min, Math.min(val, max));
        }
        
        // Initialises canvas variables and emits a new draw call to other canvases
        function init() {
            // grab the canvas and its context
            canvas = document.querySelector('canvas');
            ctx = canvas.getContext('2d');
            
            // create the offscreen buffer canvas and grab its context
            bufferCanvas = document.createElement('canvas');
            bufferCtx = bufferCanvas.getContext('2d');
            
            // grab any the other DOM elements we use for displaying server info
            serverInfo = document.querySelector('#serverInfo');
            
            // prepare connect button for making server connection
            document.querySelector('#connect').addEventListener('click', connectSocket);
        
            // get canvas mouseover callbacks to update paddle position
            document.addEventListener('mousemove', function(e) {
                var canvasPos = canvas.getBoundingClientRect();
                user.pos.x = clamp(e.x - canvasPos.left, (side.is*canvas.width/2) + user.img.width/2, (side.is*canvas.width/2)+canvas.width/2-user.img.width/2);
                user.pos.y = clamp(e.y - canvasPos.top, user.img.width/2, canvas.height-user.img.height/2);
            })
            
            // load paddle and puck icons from the server
            user.img.src = "../media/userPaddle.png";
            otherUser.img.src = "../media/enemyPaddle.png";
            puck.img.src = "../media/puck.png";
            
            // setup canvas for drawing text
            ctx.font = "14pt 'Roboto'";
        }
        
        // The main draw and update loop, which is started once a game begins
        function update() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // update puck position
            puck.pos.x += puck.vel.x;
            puck.pos.y += puck.vel.y;
            
            // Client will simulate puck physics here in case of some server disconnect
            // attemp to bounce the puck off walls
            bouncePuck();
            
            // apply friction to the puck
            puck.vel.x *= 0.9975;
            puck.vel.y *= 0.9975;
            
            // draw the three game elements
            ctx.drawImage(puck.img, puck.pos.x - puck.img.width/2, puck.pos.y - puck.img.height/2);
            ctx.drawImage(user.img, user.pos.x - user.img.width/2, user.pos.y - user.img.height/2);
            ctx.drawImage(otherUser.img, otherUser.pos.x - otherUser.img.width/2, otherUser.pos.y - otherUser.img.height/2);
            
            // draw the scores in the corners
            ctx.save();
                // draw the scores on the correct side depending on which side we're playing on
                if (side.is === 0) {
                    ctx.fillText(user.username + ": " + user.points, 5, 25);
                    ctx.textAlign = "end";
                    ctx.fillText(otherUser.points + " :" + otherUser.username, canvas.width - 5, 25);
                }
                else {
                    ctx.fillText(otherUser.username + ": " + otherUser.points, 5, 25);
                    ctx.textAlign = "end";
                    ctx.fillText(user.points + " :" + user.username, canvas.width - 5, 25);
                }
            ctx.restore();
            
            // emit our position to the other user
            socket.emit("update", {pos: user.pos})
            
            // draw the current notification from the server
            if (notification != "") {
                ctx.save();
                    ctx.font = "36pt Roboto";
                    ctx.textAlign = "center"
                    ctx.textBaseline = "middle";
                    ctx.fillText(notification, canvas.width/2, canvas.height/3);
                ctx.restore();
            }
            
            // request next frame
            requestAnimationFrame(update);
        }

        /* bouncePuck
            checks the puck's position and bounces it off the walls
        */
        function bouncePuck() {
            // bounce left-right
            if ((puck.pos.x - puck.radius < 0) || (puck.pos.x + puck.radius > canvas.width)) {
                puck.vel.x *= -1;
            }
            
            // bounce up-down
            if ((puck.pos.y - puck.radius < 0) || (puck.pos.y + puck.radius > canvas.height)) {
                puck.vel.y *= -1;
            }
        }
        
        
        window.onload = init;
        })();
  return (
    <>
      <>
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
            Please update to an HTML5 compatible web browser :)
          </canvas>
        </div>
      </>
    </>
  );
}
