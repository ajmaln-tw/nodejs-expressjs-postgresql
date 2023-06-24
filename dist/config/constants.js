"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TYPE_OF_USER_NAME = exports.TYPE_OF_USER = exports.ERROR_CODE = exports.SUBSCRIPTION_MODEL = exports.USER_TYPE = void 0;
exports.USER_TYPE = {
    ORGANIZATION: "Organization",
    VESSEL: "Vessel",
    ADMIN: "Admin"
};
exports.SUBSCRIPTION_MODEL = {
    BASIC: "BASIC",
    STANDARD: "STANDARD",
    PREMIUM: "PREMIUM"
};
exports.ERROR_CODE = {
    INVALID_TOKEN: 9401,
    TOKEN_REQUIRED: 9402
};
exports.TYPE_OF_USER = ["1100", "1101", "1102"];
exports.TYPE_OF_USER_NAME = {
    "1100": "CUSTOMER",
    "1101": "VENDOR",
    "1102": "ADMIN"
};
