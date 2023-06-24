"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDetailsSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userDetailsSchema = joi_1.default.object({
    id: joi_1.default.number(),
    email: joi_1.default.string().email().required(),
    name: joi_1.default.string().min(1).required(),
    status: joi_1.default.boolean().required(),
    typeofUser: joi_1.default.object({
        id: joi_1.default.number().required(),
        name: joi_1.default.string().required()
    }).required(),
});
