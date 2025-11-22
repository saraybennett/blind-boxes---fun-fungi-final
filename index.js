//Initialize the express 'app' object
let express = require("express");
let app = express();
app.use("/", express.static("public"));

//Initialize the actual HTTP server
let http = require("http");
let server = http.createServer(app);
let port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("Server listening at port: " + port);
});

//Initialize socket.io
let io = require("socket.io");
io = new io.Server(server);

//Listen for individual clients/users to connect

io.sockets.on("connection", function (socket) {
  console.log("We have a new client: " + socket.id);

  //Listen for a message named 'msg' from this client
  //Listen for messages from the client
  //Listen for an event named 'message' from client
  socket.on("message", (data) => {
    console.log("Received 'message' with the following data:");
    console.log(data);

    //assign a sound to the user
    // socket.soundFile = "audio/notification.mp3";

    //Send a response to all clients, including this one
    io.sockets.emit("msg", data);

    //Send a response to all other clients, not including this one
    // socket.broadcast.emit('msg', data);

    //Send a response to just this client
    // socket.emit('msg', data);
  });

  //Listen for this client to disconnect
  socket.on("disconnect", function () {
    console.log("A client has disconnected: " + socket.id);
  });
});

//emit when something happens
// socket.emit('play_sound', {
//   file: socket.soundFile
// });
