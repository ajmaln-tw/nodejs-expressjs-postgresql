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
exports.updateUser = exports.deleteUserById = exports.userById = exports.getProfile = exports.users = exports.customerById = exports.updateCustomer = exports.createCustomer = exports.customers = void 0;
const User_1 = require("../models/User");
const Customer_1 = require("../models/Customer");
const lodash_1 = __importDefault(require("lodash"));
const constants_1 = require("../config/constants");
const Address_1 = require("../models/Address");
const utilts_1 = require("./utilts");
const sequelize_1 = require("sequelize");
const customers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pageSize, pageIndex, totalCount } = req.query;
        const limit = parseInt(pageSize) || 10;
        const offset = parseInt(pageIndex) * limit;
        const customers = yield Customer_1.Customer.findAndCountAll({
            include: [
                {
                    model: User_1.User,
                    attributes: ["name", "email"]
                },
                {
                    model: Address_1.Address,
                    attributes: ["id", "address", "city", "postalCode", "country"]
                }
            ],
            order: [['id', 'ASC']],
            limit,
            offset,
        });
        if (!customers)
            return res.status(400).json({ message: "No Records Found" });
        const totalPages = Math.ceil(customers.count / limit);
        res.status(200).json({
            data: customers.rows,
            pageIndex: parseInt(pageIndex),
            pageSize: limit,
            totalCount: customers.count,
            totalPages,
        });
    }
    catch (error) {
        console.log("Error", error);
        res.status(500).json({ errorTitle: "Error", message: 'Internal server error' });
    }
});
exports.customers = customers;
const createCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, address: addresses = [] } = req.body;
    try {
        const user = yield User_1.User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "Customer not found" });
        }
        user.name = name;
        yield user.save();
        const customer = yield Customer_1.Customer.create({ userId: id });
        // Create the addresses and associate with the customer
        const createdAddresses = yield Promise.all(addresses.map((address) => Address_1.Address.create(Object.assign({ customerId: customer.id }, address))));
        res.status(201).json(Object.assign(Object.assign({}, (0, utilts_1.formatUserBasicDetails)(user)), { address: createdAddresses }));
    }
    catch (error) {
        console.log("Error", error);
        res.status(500).json({ errorTitle: "Error", message: 'Internal server error' });
    }
});
exports.createCustomer = createCustomer;
const updateCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, addresses = [] } = req.body;
    const { id: customerId } = req.params;
    const userId = lodash_1.default.get(req, "user");
    try {
        if (addresses.length > 9)
            return res.json({ message: "Address Entries limit exceeded" });
        const user = yield User_1.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "Customer not found" });
        }
        user.name = name;
        yield user.save();
        //if address already exists save to db
        //not exists, save to data to db
        const existingAddresses = yield Address_1.Address.findAll({ where: { customerId: customerId } });
        const existingAddressIds = existingAddresses.map((address) => address.id);
        console.log("existingAddressIds", existingAddressIds);
        const updatedAddresses = [];
        const createdAddresses = [];
        const removedAddressIds = [];
        // Loop through addresses and determine if they are new or existing
        for (const address of addresses) {
            if (address.id && existingAddressIds.includes(address.id)) {
                // Existing address, update it
                yield Address_1.Address.update(address, { where: { id: address.id } });
                updatedAddresses.push(address);
            }
            else if (address.id && existingAddressIds.includes(address.id)) {
                console.log("here deleted entries", existingAddressIds.includes(address.id));
                removedAddressIds.push(address.id);
                // await Address.destroy({ where: { id: address.id } });
            }
            else {
                // New address, create it
                const createdAddress = yield Address_1.Address.create(Object.assign({ customerId: parseInt(customerId) }, address));
                createdAddresses.push(createdAddress);
            }
        }
        for (const address of addresses) {
            if (address.id && !existingAddressIds.includes(address.id)) {
                removedAddressIds.push(address.id);
            }
        }
        if (removedAddressIds.length > 0) {
            yield Address_1.Address.destroy({ where: { id: { [sequelize_1.Op.in]: removedAddressIds } } });
        }
        console.log("removedAddressIds", removedAddressIds);
        let newAddress = [...updatedAddresses, ...createdAddresses];
        let updatedData = Object.assign(Object.assign({ customerId: parseInt(customerId) }, (0, utilts_1.formatUserBasicDetails)(user)), { addresses: newAddress });
        res.status(201).json({ data: updatedData });
    }
    catch (error) {
        console.log("Error", error);
        res.status(500).json({ errorTitle: "Error", message: 'Internal server error' });
    }
});
exports.updateCustomer = updateCustomer;
const customerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = lodash_1.default.get(req, "user");
    try {
        const customer = yield Customer_1.Customer.findOne({ where: { id: id } });
        const user = yield User_1.User.findByPk(userId, { raw: true });
        const addresses = yield Address_1.Address.findAll({
            attributes: ['id', 'address', 'postalCode', 'city', 'country'],
            where: { customerId: customer === null || customer === void 0 ? void 0 : customer.id }, raw: true
        });
        if (!user)
            return res.status(404).json({ message: "No User Found" });
        res.status(200).json({ data: Object.assign(Object.assign({ customerId: parseInt(id) }, (0, utilts_1.formatUserBasicDetails)(user)), { addresses }) });
    }
    catch (error) {
        console.log("Error", error);
        res.status(500).json({ errorTitle: "Error", message: 'Internal server error' });
    }
});
exports.customerById = customerById;
const users = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pageSize, pageIndex, totalCount } = req.query;
        const limit = parseInt(pageSize) || 10;
        const offset = parseInt(pageIndex) * limit;
        const users = yield User_1.User.findAndCountAll({
            attributes: ['id', 'name', 'email', 'status'],
            order: [['id', 'ASC']],
            limit,
            offset,
        });
        const totalPages = Math.ceil(users.count / limit);
        res.status(200).json({
            data: users.rows,
            pageIndex: parseInt(pageIndex),
            pageSize: limit,
            totalCount: users.count,
            totalPages,
        });
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
        const result = yield User_1.User.findByPk(id, { raw: true });
        if (!result)
            return res.status(404).json({ message: "User Profile not found" });
        const data = lodash_1.default.omit(result, ["createdAt", "password", "updatedAt", "status"]);
        res.status(200).json(data);
    }
    catch (error) {
        console.log("Error", error);
        res.status(500).json({ errorTitle: "Error", message: 'Internal server error' });
    }
});
exports.getProfile = getProfile;
const userById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield User_1.User.findByPk(id, { raw: true });
        if (!result)
            return res.status(404).json({ message: "User Profile not found" });
        const data = lodash_1.default.omit(result, ["createdAt", "password", "updatedAt"]);
        const updatedResult = Object.assign(Object.assign({}, data), { typeofUser: {
                id: data.typeofUser,
                name: constants_1.TYPE_OF_USER_NAME[data.typeofUser],
            } });
        res.status(200).json(updatedResult);
    }
    catch (error) {
        console.log("Error", error);
        res.status(500).json({ errorTitle: "Error", message: 'Internal server error' });
    }
});
exports.userById = userById;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield User_1.User.destroy({ where: { id: id } });
        res.status(200).json({});
    }
    catch (error) {
        console.log("Error", error);
        res.status(500).json({ errorTitle: "Error", message: 'Internal server error' });
    }
});
exports.deleteUserById = deleteUserById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        res.status(201).json(updatedResult);
    }
    catch (error) {
        console.log("Error", error);
        res.status(500).json({ errorTitle: "Error", message: 'Internal server error' });
    }
});
exports.updateUser = updateUser;
