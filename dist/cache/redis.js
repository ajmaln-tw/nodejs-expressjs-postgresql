"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const redis_1 = __importDefault(require("redis"));
// Create a Redis client
exports.client = redis_1.default.createClient();
// Handle any Redis connection errors
exports.client.on('error', (err) => {
    console.error('Redis connection error:', err);
});
