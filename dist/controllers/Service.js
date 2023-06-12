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
exports.getProfile = exports.users = exports.customerById = exports.customers = void 0;
const Users_1 = require("../models/Users");
const Customers_1 = require("../models/Customers");
const lodash_1 = __importDefault(require("lodash"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const customers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield Customers_1.Customer.findAll();
        if (!user)
            return res.status(404).json({ message: "No Records Found" });
        res.status(200).json({ data: user });
    }
    catch (error) {
        console.log("Error", error);
        res.status(500).json({ errorTitle: "Error", message: 'Internal server error' });
    }
});
exports.customers = customers;
const customerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield Customers_1.Customer.findOne({ where: { userId: id } });
        if (!user)
            return res.status(404).json({ message: "No User Found" });
        res.status(200).json({ data: user });
    }
    catch (error) {
        console.log("Error", error);
        res.status(500).json({ errorTitle: "Error", message: 'Internal server error' });
    }
});
exports.customerById = customerById;
const users = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield Users_1.User.findAll();
        if (!user)
            return res.status(404).json({ message: "No Records Found" });
        const filePath = path_1.default.join(__dirname, 'dummy.json');
        const fileContents = yield promises_1.default.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileContents);
        res.status(200).json(jsonData);
        // res.status(200).json({ data: user });
    }
    catch (error) {
        console.log("Error", error);
        res.status(500).json({ errorTitle: "Error", message: 'Internal server error' });
    }
});
exports.users = users;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = lodash_1.default.get(req, "user", 1);
        const result = yield Users_1.User.findByPk(id, { raw: true });
        if (!result)
            return res.status(404).json({ message: "User Profile not found" });
        const data = lodash_1.default.omit(result, ["createdAt", "password", "updatedAt", "status"]);
        console.log(data);
        res.status(200).json(data);
    }
    catch (error) {
        console.log("Error", error);
        res.status(500).json({ errorTitle: "Error", message: 'Internal server error' });
    }
});
exports.getProfile = getProfile;
