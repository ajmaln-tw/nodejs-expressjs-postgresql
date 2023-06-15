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
exports.queryValidator = exports.validator = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const validator = (schemaName, body, next) => __awaiter(void 0, void 0, void 0, function* () {
    const value = yield schemaName.validate(body);
    try {
        value.error
            ? next((0, http_errors_1.default)(422, value.error.details[0].message))
            : next();
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
    }
});
exports.validator = validator;
const queryValidator = (schemaName, params, next) => __awaiter(void 0, void 0, void 0, function* () {
    const value = yield schemaName.validate(params);
    try {
        value.error
            ? next((0, http_errors_1.default)(400, value.error.details[0].message))
            : next();
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.log("here", error);
        console.log(error);
    }
});
exports.queryValidator = queryValidator;
