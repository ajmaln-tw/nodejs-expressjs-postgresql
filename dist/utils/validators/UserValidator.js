"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserDetails = exports.getByIdValidator = exports.paginationValidator = void 0;
const validator_1 = require("./validator");
const common_1 = require("./schemas/common");
const User_1 = require("./schemas/User");
const paginationValidator = (req, res, next) => {
    (0, validator_1.queryValidator)(common_1.paginationSchema, req.query, next);
};
exports.paginationValidator = paginationValidator;
const getByIdValidator = (req, res, next) => {
    (0, validator_1.queryValidator)(common_1.getByIdParamsSchema, req.query, next);
};
exports.getByIdValidator = getByIdValidator;
const validateUserDetails = (req, res, next) => {
    (0, validator_1.validator)(User_1.userDetailsSchema, req.body, next);
};
exports.validateUserDetails = validateUserDetails;
