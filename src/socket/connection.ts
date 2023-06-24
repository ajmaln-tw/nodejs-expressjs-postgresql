import { NextFunction } from 'express';
import { Server, Socket } from 'socket.io';
import { verifyTokenSocket } from '../utils/middleWare';
import { newConnectionHandler } from './socketHandler/newSocketHandler';
import { disconnectHandler } from './socketHandler/disconnectHandler';
import { getActiveConnections } from './serverStore';


function initializeSocket(server: any): void {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    });
    io.use((socket: Socket, next: any) => verifyTokenSocket(socket, next));
    io.on('connection', (socket) => {
        console.log('A client has connected.', socket.id);
        newConnectionHandler(socket, io)
        handleSocketEvents(socket, io);
        appNotifications(socket);

        // let intervalId = setInterval(() => {
        //     emitPushNotification(socket);
        // }, 2000);

        socket.on('disconnect', () => {
            disconnectHandler(socket, io);
            // clearInterval(intervalId);


        });
    });

    io.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });
}

function handleSocketEvents(socket: any, io: any): void {
    socket.on('send_message', (message: string) => {
        console.log('Received chat message:', message);
        io.emit('chat message', message);
    });
}

function appNotifications(socket: any): void {
    console.log("app_notifications  event", 0)
    socket.emit("app_notifications", {
        title: "Connected",
        message: "Successfully Connected to server"
    });
}


let i = 0;
function emitPushNotification(socket: any): void {
    const baseTaskID = Math.round((Date.now() - 1511098000000) / 1000);
    const rpm = Math.random() * 100;
    const sogValue = Math.random() * 45;
    i++
    const sog = rpm / sogValue;
    console.log("push_notifications  event", i)
    socket.emit("push_notifications", {
        vesselId: `${baseTaskID + i}`,
        torque: baseTaskID + i,
        RPM: rpm + 6000,
        sog: sog
    });
}

export default initializeSocket;
