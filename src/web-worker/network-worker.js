var enet = require('enet');

const serverAddress = "localhost";
const serverPort = 7777;

var client;
var peer;

self.addEventListener('message', function(e) {
    var data = e.data;

    console.log(`Worker received ${data.cmd} message`);

    switch (data.cmd) {
        case 'initialize':
            
            createWorker();
            break;
    }
}, false);

function createWorker() {
    client = enet.createClient();
    var server_address = new enet.Address(serverAddress, serverPort);

    console.log(`Creating enet client with address of ${server_address}:${serverPort}`);
    peer = client.createClient(server_address);

    peer.on('connect', function() {
        console.log("Enet client connected");
        peer.ping();
    });
}