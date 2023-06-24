
/* eslint-disable indent */
import { Express } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { ERROR_MSG } from "../config/messages";
import { ERROR_CODE } from "../config/constants";
import { Request, Response, NextFunction } from 'express';
import { config } from "../config/config";
import _ from "lodash";
import * as redis from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { ClientCommandOptions } from "@redis/client/dist/lib/client";
import createHttpError from "http-errors";

// TODO :- check JWT_SECRET
// TODO :- bearer token
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token: string | undefined = req.query.token as string || req.headers.authorization as string;
        if (!token) {
            return res.status(401).json({ message: "Token Required for accessing this resource", errorCode: ERROR_CODE.TOKEN_REQUIRED });
        }
        token = token.split(" ")[1];
        if (token && !token.length) {
            return res.status(403).json({ message: "Invalid token", errorCode: ERROR_CODE.TOKEN_REQUIRED });
        }
        const decodedToken: any = jwt.verify(token, config.tokens.jwt_token as string);
        const { id = "" } = decodedToken;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json(ERROR_MSG.USER_NOT);
        }
        if (!user.status) {
            return res.status(401).json({ message: "User blocked from accessing all resources" });
        }
        _.set(req, "user", user.id)
        next();
    } catch (error) {
        res.status(401).json({ message: (error as Error).message, errorCode: ERROR_CODE.INVALID_TOKEN });
    }
};




const redisClient = redis.createClient({
    url: "redis://default:IO8YoR0X6h58gswRFQm0@containers-us-west-124.railway.app:7414"
});

const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "middleware",
    points: 10, // 10 requests
    duration: 1, // per 1 second by IP
});



const rateLimiters: Record<string, { requests: number; lastRequestTime: number }> = {};

export const rateLimiterMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const MAX_REQUESTS = 50; // Maximum allowed requests within the time window
    const TIME_WINDOW = 60 * 1000; // Time window in milliseconds (e.g., 1 minute)

    // Check if the IP address is stored in the request object, or use req.ip directly
    const clientIp: any = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Create or retrieve the rate limiter data structure for each IP address
    const rateLimiterData = rateLimiters[clientIp] || {
        requests: 0,
        lastRequestTime: Date.now()
    };

    const currentTime = Date.now();
    const elapsedTime = currentTime - rateLimiterData.lastRequestTime;

    if (elapsedTime > TIME_WINDOW) {
        // Reset the rate limiter if the time window has passed
        rateLimiterData.requests = 1;
        rateLimiterData.lastRequestTime = currentTime;
    } else {
        // Increment the request count if still within the time window
        rateLimiterData.requests++;
        rateLimiterData.lastRequestTime = currentTime;
    }

    rateLimiters[clientIp] = rateLimiterData;

    if (rateLimiterData.requests <= MAX_REQUESTS) {
        // If within the allowed request limit, proceed to the next middleware
        next();
    } else {
        // If the request limit is exceeded, send a "Too Many Requests" response
        res.status(429).json({ message: "Too Many Requests" });
    };
}

export const verifyTokenSocket = (socket: any, next: NextFunction) => {
    const token = socket.handshake.auth?.token;
    console.log("ajmal token", token)
    try {
        if (!token) createHttpError(401, "Invalid Token");
        const decodedToken = jwt.verify(token, config.tokens.jwt_token as string)
        console.log("ajmal decodedToken", decodedToken)
        socket.user = decodedToken;
    } catch (error) {
        socket.disconnect(true);
        console.log("ajmal error", error)
        const socketError = new Error("UN_AUTHORIZED")
        return socketError;
    }
    next()
}


interface PaginationOptions {
    defaultPageSize?: number;
    maxPageSize?: number;
}