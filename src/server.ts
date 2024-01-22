import express, { Request, Response, ErrorRequestHandler, RequestHandler } from 'express';
import authApi from './routes/authApi';
import apiResourceRoutes from './routes/apiResourceRoutes';
import cors from 'cors';
import logger from "morgan";
import { config } from "./config/config";
import { fileServer, rateLimiterMiddleware, serveFile, verifyToken } from './utils/middleWare';
import compression from "compression";
import responseTime from "response-time";
import rateLimiter from "rate-limiter-flexible";
import http from "http";
import socketIO from "socket.io";
import helmet from "helmet";
import initializeSocket from './socket/connection';
import fs from 'fs';
import path from 'path';
// Todo 
// Kenx, objection
// initial setup DB
// Todo
const server = express();
const socServer = http.createServer(server)
initializeSocket(socServer);



const uploadDirectory = 'uploads';

// Check if the directory exists
if (!fs.existsSync(uploadDirectory)) {
    // Create the directory
    fs.mkdirSync(uploadDirectory);
}

server.use(helmet());
server.use(cors());
server.use(express.static('uploads'));

server.use(compression(config.compressionConfig));
server.use(rateLimiterMiddleware);
server.use(responseTime());
server.use(logger("dev"));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use('/uploads', fileServer);
server.use('/files/:filename', serveFile)

// Health Check 
server.get('/ping', (req: Request, res: Response) => res.status(200).json({ pong: true }));

server.use("/api/no-auth", authApi);
server.use("/api/auth", verifyToken, apiResourceRoutes);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(400); // Bad Request
    console.log(err);
    res.json({ errorTitle: "Bad Request", message: err.message || 'An error has occurred.' });
    next()
};

// Routes not found middleware
const notFoundHandler: RequestHandler = (req, res, next) => {
    res.status(404);
    res.json({ message: 'Requested Resource not found.' });
    next()
};

// Register the error handling middleware and not found middleware
server.use(notFoundHandler);
server.use(errorHandler);

socServer.listen(config.server.port, () => {
    console.log("server running on " + config.server.port)
});