"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authApi_1 = __importDefault(require("./routes/authApi"));
const apiResourceRoutes_1 = __importDefault(require("./routes/apiResourceRoutes"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = require("./config/config");
const middleWare_1 = require("./utils/middleWare");
const compression_1 = __importDefault(require("compression"));
const response_time_1 = __importDefault(require("response-time"));
const http_1 = __importDefault(require("http"));
const helmet_1 = __importDefault(require("helmet"));
const connection_1 = __importDefault(require("./socket/connection"));
// todo Kenx, objection
// initial setup DB
const server = (0, express_1.default)();
const socServer = http_1.default.createServer(server);
(0, connection_1.default)(socServer);
server.use((0, helmet_1.default)());
server.use((0, cors_1.default)({ origin: ["http://localhost:3000", "http://localhost:3001"] }));
server.use((0, compression_1.default)(config_1.config.compressionConfig));
// server.use(rateLimiterMiddleware);
server.use((0, response_time_1.default)());
server.use((0, morgan_1.default)("dev"));
server.use(express_1.default.urlencoded({ extended: true }));
server.use(express_1.default.json());
// Health Check
server.get("/api/no-auth/ping", (req, res) => res.json({ pong: true }));
server.use("/api/no-auth", authApi_1.default);
server.use("/api/auth", middleWare_1.verifyToken, apiResourceRoutes_1.default);
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
socServer.listen(config_1.config.server.port, () => {
    console.log("server running on " + config_1.config.server.port);
});
// socServer.listen(8000, () => {
//     console.log("Socket Running on " + 8000)
// })
