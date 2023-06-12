"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const compression_1 = __importDefault(require("compression"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SERVER_PORT = process.env.SERVER_PORT || 0;
const PG_PORT = process.env.PG_PORT || "";
exports.config = {
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
        filter: (req, res) => {
            if (req.headers["x-no-compression"]) {
                return false;
            }
            return compression_1.default.filter(req, res);
        }
    }
};
