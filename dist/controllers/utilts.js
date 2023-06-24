"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatUserBasicDetails = void 0;
const lodash_1 = __importDefault(require("lodash"));
const formatUserBasicDetails = (user) => {
    let newUserBasicDetails = lodash_1.default.pick(user, ["name", "email", "id"]);
    return newUserBasicDetails;
};
exports.formatUserBasicDetails = formatUserBasicDetails;
