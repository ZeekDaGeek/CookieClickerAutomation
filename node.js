const WebSocket = require("ws");
const server = new WebSocket.Server({
    port: 5069
});

console.log("Starting server on localhost:5069.");

function truncate(str, n){
  return (str.length > n) ? str.substr(0, n-1) + '...' : str;
};

let sockets = [];
server.on("connection", function(socket){
    sockets.push(socket);

    console.log("New socket connection.");

    // Rebroadcast any messages
    socket.on("message", function(msg){
        console.log("  Message: " + truncate(msg.toString(), 64));
        sockets.forEach(s => s.send(msg.toString()));
    });

    // Remove socket from list when disconnected.
    socket.on("close", function(){
        sockets = sockets.filter(s => s !== socket);
    });
});
