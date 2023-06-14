"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeConnectedUser = exports.addNewConnectedUser = void 0;
const connectedUser = new Map();
const addNewConnectedUser = ({ socketId, userId }) => {
    connectedUser.set(socketId, { userId });
};
exports.addNewConnectedUser = addNewConnectedUser;
const removeConnectedUser = (socketId) => {
    if (connectedUser.has(socketId)) {
        connectedUser.delete(socketId);
    }
};
exports.removeConnectedUser = removeConnectedUser;
