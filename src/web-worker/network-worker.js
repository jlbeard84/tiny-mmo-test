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

}