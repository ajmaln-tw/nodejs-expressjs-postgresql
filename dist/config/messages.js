"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaMessages = exports.SUCCESS_MESSAGE = exports.ERROR_MSG = void 0;
exports.ERROR_MSG = {
    ALREADY_EXISTS: "User already exists, please try different email",
    PROFILE_NOT: "Profile not created, try again",
    SOMETHING_WENT: "Something Went Wrong",
    USER_NOT: "User not found"
};
exports.SUCCESS_MESSAGE = {
    CREATED: "Created Successfully",
    UPDATED: "Updated Successfully"
};
exports.schemaMessages = {
    required: " Required",
    nameRequired: "Name Required",
    passwordAtLeast3: "Password must be at least 3 characters",
    passwordNotGT30: "Password cannot exceed 30 characters",
    passwordRequired: "Password is required",
    emailString: "Email must be a string",
    invalidEmail: "Invalid email format",
    emailRequired: "Email is required"
};
