"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
let baseTaskID = Math.round((Date.now() - 1511098000000) / 1000);
let rpm = Math.random() * 100;
let sogValue = Math.random() * 45;
let i = 0;
let result = new Map();
function initializeSocket(server) {
    setInterval(() => i++, 2000);
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
            io.emit('chat message', message);
        });
        let sog = rpm / sogValue;
        setInterval(() => {
            socket.emit("push_notifications", {
                vesselId: `${baseTaskID + i}`,
                torque: baseTaskID + i,
                RPM: rpm + 6000,
                sog: sog
            });
        }, 2000);
    });
    io.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });
    io.on('disconnect', function (socket) {
        console.log('A client has disconnected.', socket.id);
        io.emit('disconnected');
    });
}
exports.default = initializeSocket;
