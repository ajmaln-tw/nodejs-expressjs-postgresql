"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationSchema = exports.getByIdParamsSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const messages_1 = require("../../../config/messages");
exports.getByIdParamsSchema = joi_1.default.object({
    id: joi_1.default.number().integer().positive().required(),
});
exports.paginationSchema = joi_1.default.object({
    pageIndex: joi_1.default.number().integer().min(0).required().messages({
        "string.min": messages_1.schemaMessages.passwordAtLeast3,
        "string.max": messages_1.schemaMessages.passwordNotGT30,
        "any.required": messages_1.schemaMessages.passwordRequired
    }),
    pageSize: joi_1.default.number().integer().min(1).required(),
    totalCount: joi_1.default.number().integer().min(0).required(),
});
