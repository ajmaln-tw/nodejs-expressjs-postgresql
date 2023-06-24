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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.profileById = void 0;
const User_1 = require("../models/User");
const lodash_1 = __importDefault(require("lodash"));
const constants_1 = require("../config/constants");
const Address_1 = require("../models/Address");
const profileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield User_1.User.findByPk(id, { raw: true });
        if (!result)
            return res.status(404).json({ message: "User Profile not found" });
        const data = lodash_1.default.omit(result, ["createdAt", "password", "updatedAt", "status", "typeofUser"]);
        const addresses = yield Address_1.Address.findAll({ where: { userId: id } });
        const userDetails = Object.assign(Object.assign({}, data), { addresses: addresses || [] });
        res.status(200).json(userDetails);
    }
    catch (error) {
        console.log("Error", error);
        res.status(500).json({ errorTitle: "Error", message: 'Internal server error' });
    }
});
exports.profileById = profileById;
;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const _a = req.body, { id: userId } = _a, updateData = __rest(_a, ["id"]);
        lodash_1.default.set(updateData, "typeofUser", lodash_1.default.get(updateData, "typeofUser.id"));
        const user = yield User_1.User.findByPk(id);
        Object.assign(user, updateData);
        yield user.save();
        const result = lodash_1.default.pick(user, ["id", "name", "email", "status", "typeofUser"]);
        const updatedResult = Object.assign(Object.assign({}, result), { typeofUser: {
                id: result.typeofUser,
                name: constants_1.TYPE_OF_USER_NAME[result.typeofUser],
            } });
        console.log("here", result);
        console.log("here updatedResult", updatedResult);
        res.status(201).json(updatedResult);
    }
    catch (error) {
        console.log("Error", error);
        res.status(500).json({ errorTitle: "Error", message: 'Internal server error' });
    }
});
exports.updateProfile = updateProfile;
