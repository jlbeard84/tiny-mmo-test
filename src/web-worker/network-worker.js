var constants = require('../constants/game-constants');

var connection;
var connected = false;
var outboundMessageQueue = [];
var inboundMessageQueue = [];
var outboundMessageInterval;
var playerId = "";

self.addEventListener('message', function(e) {
    var data = e.data;

    console.log(`Worker received ${data.cmd} message`);

    switch (data.cmd) {
        case 'initialize':
            createWorker();
            break;
        case 'posUpdate':
            sendPosition(data.x, data.y);
            break;
    }
}, false);

function createWorker() {
    createConnection();    

    connection.onopen = (e) => {
        console.log(`Connected to websocket server at ${connection.url}`);
        connected = true;

        sendInitialization();

        outboundMessageInterval = setInterval(
            processOutboundMessages, 
            constants.GameConstants.SocketServerSendInterval);
    };

    connection.onclose = (e) => {
        clearInterval(outboundMessageInterval);
        console.log(`Connection to websocket server closed.`);
        connected = false;

        console.log(`Retrying server connection...`);
        createConnection();
    }

    connection.onmessage = (e) => {
        var message = JSON.parse(e.data);

        if (Array.isArray(message)) {
            console.log(`Received ${message.length} websocket messages`);

            for (var i = 0; i < message.length; i++) {
                processInboundMessage(message[i]);
            }
        } else {
            console.log(`Received single websocket message of type ${message.messageType}`);
            processInboundMessage(message);
        }
    }
}

function processInboundMessage(message) {
    switch (message.messageType) {
        case "initialization":
            console.log("Received echo init");
            break;
        case "playerid":
            playerId = message.messageData;
            console.log(`PlayerId set to ${playerId}`);
            postMessage({"cmd": "playerId", "data": playerId });
            break;
    }
}

function createConnection() {
    connection = new WebSocket(constants.GameConstants.SocketServerAddress);
    connection.binaryType = "arraybuffer";
}

function sendInitialization() {
    outboundMessageQueue.push({
        "messageType": "initialization",
        "messageData": ""
    });
}

function sendPosition(x, y) {
    outboundMessageQueue.push({
        "messageType": 'posUpdate',
        "xPos": x,
        "yPos": y
    });
}

function processOutboundMessages() {
    if (!connected) {
        return;
    }

    var messagesToSend = [];

    while (outboundMessageQueue.length > 0) {
        messagesToSend.push(outboundMessageQueue.shift());
    }

    if (messagesToSend.length > 0) {
        var convertedData = JSON.stringify(messagesToSend);

        console.log(`Sending ${messagesToSend.length} websocket messages`);
    
        connection.send(convertedData);
    }
}