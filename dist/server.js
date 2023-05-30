"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./routes/api"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = require("./config/config");
//todo Kenx, objection
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.use((0, morgan_1.default)("dev"));
server.use(express_1.default.urlencoded({ extended: true }));
server.use(express_1.default.json());
// Health Check
server.get('/ping', (req, res) => res.json({ pong: true }));
server.use("/v1/", api_1.default);
server.use((req, res) => {
    res.status(404);
    res.json({ error: 'Requested Endpoint not found.' });
});
const errorHandler = (err, req, res, next) => {
    res.status(400); // Bad Request
    console.log(err);
    res.json({ error: 'An error has occurred.' });
};
server.use(errorHandler);
server.listen(config_1.config.server.port, () => {
    console.log("server running on " + config_1.config.server.port);
});
