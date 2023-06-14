"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const middleWare_1 = require("../utils/middleWare");
const newSocketHandler_1 = require("./socketHandler/newSocketHandler");
const disconnectHandler_1 = require("./socketHandler/disconnectHandler");
function initializeSocket(server) {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    });
    io.use((socket, next) => (0, middleWare_1.verifyTokenSocket)(socket, next));
    io.on('connection', (socket) => {
        console.log('A client has connected.', socket.id);
        (0, newSocketHandler_1.newConnectionHandler)(socket, io);
        handleSocketEvents(socket, io);
        appNotifications(socket);
        let intervalId = setInterval(() => {
            emitPushNotification(socket);
        }, 12000);
        socket.on('disconnect', () => {
            (0, disconnectHandler_1.disconnectHandler)(socket);
            clearInterval(intervalId);
        });
    });
    io.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });
}
function handleSocketEvents(socket, io) {
    socket.on('send_message', (message) => {
        console.log('Received chat message:', message);
        io.emit('chat message', message);
    });
}
function appNotifications(socket) {
    console.log("app_notifications  event", 0);
    socket.emit("app_notifications", {
        title: "Connected",
        message: "Successfully Connected to server"
    });
}
let i = 0;
function emitPushNotification(socket) {
    const baseTaskID = Math.round((Date.now() - 1511098000000) / 1000);
    const rpm = Math.random() * 100;
    const sogValue = Math.random() * 45;
    i++;
    const sog = rpm / sogValue;
    console.log("push_notifications  event", i);
    socket.emit("push_notifications", {
        vesselId: `${baseTaskID + i}`,
        torque: baseTaskID + i,
        RPM: rpm + 6000,
        sog: sog
    });
}
exports.default = initializeSocket;
