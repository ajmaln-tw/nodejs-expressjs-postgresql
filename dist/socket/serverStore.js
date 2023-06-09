"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActiveConnections = exports.removeConnectedUser = exports.addNewConnectedUser = exports.getSocketServerInstance = exports.setSocketServerInstance = void 0;
const connectedUser = new Map();
let io = null;
const setSocketServerInstance = (IOInstance) => {
    io = IOInstance;
};
exports.setSocketServerInstance = setSocketServerInstance;
const getSocketServerInstance = () => {
    return io;
};
exports.getSocketServerInstance = getSocketServerInstance;
const addNewConnectedUser = ({ socketId, user }) => {
    connectedUser.set(socketId, user);
};
exports.addNewConnectedUser = addNewConnectedUser;
const removeConnectedUser = (socketId) => {
    if (connectedUser.has(socketId)) {
        connectedUser.delete(socketId);
    }
};
exports.removeConnectedUser = removeConnectedUser;
const getActiveConnections = (userId) => {
    const activeConnections = [];
    connectedUser.forEach((key, value) => {
        if (value.id !== userId) {
            activeConnections.push(Object.assign({ socketId: value }, key));
        }
    });
    return activeConnections;
};
exports.getActiveConnections = getActiveConnections;
