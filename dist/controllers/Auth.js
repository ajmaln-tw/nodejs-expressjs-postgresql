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
exports.signUp = exports.signIn = void 0;
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config/config");
const lodash_1 = __importDefault(require("lodash"));
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email = "", password = "" } = req.body;
    try {
        const user = yield User_1.User.findOne({ where: { email } });
        if (!user)
            return res.status(401).json({ message: "Invalid Credential" });
        const id = user.id;
        const isPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!isPassword)
            return res.status(401).json({ messages: "Invalid Credential" });
        const token = jsonwebtoken_1.default.sign({ id, email: user.email, name: user.name }, config_1.config.tokens.jwt_token, { expiresIn: "1d" });
        res.status(200).json({ token });
    }
    catch (error) {
        console.log("Error", error);
        res.status(500).json({ errorTitle: "Error", message: 'Internal server error' });
    }
});
exports.signIn = signIn;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { error = {}, value = {} } = registerValidator(req.body);
    // if (error) return res.status(400).json({ message: error.details });
    const { email, password } = req.body;
    const credentials = lodash_1.default.cloneDeep(req.body);
    const profileDetails = lodash_1.default.omit(credentials, ["password"]);
    try {
        const isExists = yield User_1.User.findOne({ where: { email } });
        if (isExists)
            return res.status(409).json({ message: "ALREADY_EXISTS" });
        const hashedPassword = yield bcrypt_1.default.hash(password, 2);
        const result = yield User_1.User.create(Object.assign(Object.assign({}, profileDetails), { password: hashedPassword }));
        if (!result)
            return res.status(400).json({ message: "PROFILE_NOT" });
        const token = jsonwebtoken_1.default.sign({ id: result.id, email: result.email, name: result.name }, config_1.config.tokens.jwt_token, { expiresIn: "1d" });
        res.status(201).json({ token });
    }
    catch (error) {
        console.log("Error", error);
        res.status(500).json({ errorTitle: "Error", message: 'Internal server error' });
    }
});
exports.signUp = signUp;
