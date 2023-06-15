"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenSocket = exports.rateLimiterMiddleware = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Users_1 = require("../models/Users");
const messages_1 = require("../config/messages");
const constants_1 = require("../config/constants");
const config_1 = require("../config/config");
const lodash_1 = __importDefault(require("lodash"));
const redis = __importStar(require("redis"));
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
// TODO :- check JWT_SECRET
// TODO :- bearer token
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = req.query.token || req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "Token Required for accessing this resource", errorCode: constants_1.ERROR_CODE.TOKEN_REQUIRED });
        }
        token = token.split(" ")[1];
        if (token && !token.length) {
            return res.status(403).json({ message: "Invalid token", errorCode: constants_1.ERROR_CODE.TOKEN_REQUIRED });
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, config_1.config.tokens.jwt_token);
        const { id = "" } = decodedToken;
        const user = yield Users_1.User.findByPk(id);
        if (!user) {
            return res.status(404).json(messages_1.ERROR_MSG.USER_NOT);
        }
        if (!user.status) {
            return res.status(401).json({ message: "User blocked from accessing resources" });
        }
        lodash_1.default.set(req, "user", user.id);
        next();
    }
    catch (error) {
        res.status(401).json({ message: error.message, errorCode: constants_1.ERROR_CODE.INVALID_TOKEN });
    }
});
exports.verifyToken = verifyToken;
const redisClient = redis.createClient({
    url: "redis://default:IO8YoR0X6h58gswRFQm0@containers-us-west-124.railway.app:7414"
});
const rateLimiter = new rate_limiter_flexible_1.RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "middleware",
    points: 10,
    duration: 1, // per 1 second by IP
});
const rateLimiterMiddleware = (req, res, next) => {
    rateLimiter
        .consume(req.ip)
        .then(() => {
        next();
    })
        .catch(() => {
        res.status(429).json({ message: "Too Many Requests" });
    });
};
exports.rateLimiterMiddleware = rateLimiterMiddleware;
const verifyTokenSocket = (socket, next) => {
    var _a;
    const token = (_a = socket.handshake.auth) === null || _a === void 0 ? void 0 : _a.token;
    console.log("ajmal token", token);
    try {
        if (!token)
            throw new Error("Invalid Token");
        const decodedToken = jsonwebtoken_1.default.verify(token, config_1.config.tokens.jwt_token);
        console.log("ajmal decodedToken", decodedToken);
        socket.user = decodedToken;
    }
    catch (error) {
        socket.disconnect(true);
        console.log("ajmal error", error);
        const socketError = new Error("UN_AUTHORIZED");
        return socketError;
    }
    next();
};
exports.verifyTokenSocket = verifyTokenSocket;
