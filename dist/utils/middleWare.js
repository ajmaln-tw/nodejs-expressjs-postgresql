"use strict";
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
exports.verifyToken = void 0;
/* eslint-disable indent */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Users_1 = require("../models/Users");
const messages_1 = require("../config/messages");
const constants_1 = require("../config/constants");
const config_1 = require("../config/config");
// TODO :- check JWT_SECRET
// TODO :- bearer token
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = req.query.token || req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "Token Required for accessing this resource", errorCode: constants_1.ERROR_CODE.TOKEN_REQUIRED });
        }
        if (!token.length) {
            return res.status(403).json({ message: "Invalid token", errorCode: constants_1.ERROR_CODE.INVALID_TOKEN });
        }
        token = token.split(" ")[1];
        const decodedToken = jsonwebtoken_1.default.verify(token, config_1.config.tokens.jwt_token);
        const { userId = "" } = decodedToken;
        const user = yield Users_1.Users.findByPk(userId);
        if (!user) {
            return res.status(404).json(messages_1.ERROR_MSG.USER_NOT);
        }
        if (!user.status) {
            return res.status(401).json({ message: "User blocked from accessing resources" });
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
});
exports.verifyToken = verifyToken;
