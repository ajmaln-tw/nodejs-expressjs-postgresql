import express, { Request, Response, ErrorRequestHandler } from 'express';
import authApi from './routes/authApi';
import apiResourceRoutes from './routes/apiResourceRoutes';
import cors from 'cors';
import logger from "morgan";
import { config } from "./config/config";
import { verifyToken } from './utils/middleWare';
import compression from "compression";
import responseTime from "response-time";
//todo Kenx, objection
// initial setup DB

const server = express();


server.use(cors());
server.use(compression(config.compressionConfig))
server.use(responseTime())
server.use(logger("dev"));
server.use(express.urlencoded({ extended: true }));
server.use(express.json())

// Health Check
server.get('/ping', (req: Request, res: Response) => res.json({ pong: true }));

server.use("/api/no-auth", authApi);
server.use("/api/auth", verifyToken, apiResourceRoutes);

server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({ error: 'Requested Endpoint not found.' });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(400); // Bad Request
    console.log(err);
    res.json({ error: 'An error has occurred.' });
}
server.use(errorHandler);

server.listen(config.server.port, () => {
    console.log("server running on " + config.server.port)
});