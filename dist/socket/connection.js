"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
function initializeSocket(server) {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    });
    io.on('connection', (socket) => {
        console.log('A client has connected.', socket.id);
        // Add your Socket.IO event handlers and logic here
        socket.on('send_message', (message) => {
            console.log('Received chat message:', message);
            io.emit('chat message', message); // Broadcast the message to all connected clients
        });
    });
    io.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });
}
exports.default = initializeSocket;
