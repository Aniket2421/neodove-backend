const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws, req) => {
    ws.on('message', (message) => {
        const msgData = JSON.parse(message);
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(msgData));
            }
        });
    });
});

module.exports = (server) => {
    server.on('upgrade', (request, socket, head) => {
        const token = request.headers['sec-websocket-protocol'];
        if (token) {
            jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
                if (err) {
                    socket.destroy();
                } else {
                    wss.handleUpgrade(request, socket, head, (ws) => {
                        request.user = decoded;
                        wss.emit('connection', ws, request);
                    });
                }
            });
        } else {
            socket.destroy();
        }
    });
};
