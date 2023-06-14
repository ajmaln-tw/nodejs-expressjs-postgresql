import express, { Request, Response, ErrorRequestHandler } from 'express';
import authApi from './routes/authApi';
import apiResourceRoutes from './routes/apiResourceRoutes';
import cors from 'cors';
import logger from "morgan";
import { config } from "./config/config";
import { verifyToken } from './utils/middleWare';
import compression from "compression";
import responseTime from "response-time";
import rateLimiter from "rate-limiter-flexible";
import http from "http";
import socketIO from "socket.io";
import helmet from "helmet";
import initializeSocket from './socket/connection';
// todo Kenx, objection
// initial setup DB

const server = express();
const socServer = http.createServer(server)
initializeSocket(socServer);

server.use(helmet());
server.use(cors({ origin: ["http://localhost:3000", "http://localhost:3001"] }));
server.use(compression(config.compressionConfig));
// server.use(rateLimiterMiddleware);
server.use(responseTime())
server.use(logger("dev"));
server.use(express.urlencoded({ extended: true }));
server.use(express.json())

// Health Check
server.get("/api/no-auth/ping", (req: Request, res: Response) => res.json({ pong: true }));

server.use("/api/no-auth", authApi);
server.use("/api/auth", verifyToken, apiResourceRoutes);

server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({ message: 'Requested Resource not found.' });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(400); // Bad Request
    console.log(err);
    res.json({ errorTitle: "Bad Request", message: err.message || 'An error has occurred.' });
}
server.use(errorHandler);

socServer.listen(config.server.port, () => {
    console.log("server running on " + config.server.port)
});