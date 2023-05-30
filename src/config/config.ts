import compression from "compression";
import dotenv from "dotenv";
import express, { Request, Response, ErrorRequestHandler } from 'express';
dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 0;
const PG_PORT = process.env.PG_PORT || "";

export const config = {
    server: {
        port: SERVER_PORT
    },
    pg: {
        name: process.env.PG_DB,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        host: process.env.PG_HOST,
        port: PG_PORT
    },
    tokens: {
        jwt_token: process.env.JWT_SECRET
    },
    compressionConfig: {
        level: 9,
        threshold: 100 * 1000,
        filter: (req: Request, res: Response) => {
            if (req.headers["x-no-compression"]) {
                return false
            }
            return compression.filter(req, res)
        }
    }
};