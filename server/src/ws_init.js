import WebSocket from 'ws'
import express from 'express'
import http from 'http'
import url from 'url'

console.log('-- init start --')

const app = express();

app.use(function (req, res) {
    res.send({ msg: "hellox" });
});

function wsInit(){
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws, req) {
    const location = url.parse(req.url, true);
    // You might use location.query.access_token to authenticate or share sessions
    // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.send('something');
});

server.listen(8188, function listening() {
    console.log('Listening on %d', server.address().port);
});
}

console.log('-- init finish --')
export default wsInit;
