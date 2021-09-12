const WebSocket = require("ws");
const fs = require("fs");
const client = new WebSocket("ws://localhost:5069");


console.log("Connecting to server on localhost:5069.");

client.on("open", function (e) {

    //let geekCode = require("./main.js");
    let codeString = fs.readFileSync("./main.js")+"";

    console.log("  Sending updated geekCode.");
    client.send(JSON.stringify({ action: "update", newObj: codeString }));

    client.close();

});

