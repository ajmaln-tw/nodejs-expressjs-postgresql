"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = require("../config/config");
const { name, user, password, host, port } = config_1.config.pg;
dotenv_1.default.config();
exports.sequelize = new sequelize_1.Sequelize({
    database: name,
    username: user,
    password: password,
    host: host,
    port: parseInt(port),
    dialect: "postgres",
    pool: {
        max: 10,
        min: 2,
        acquire: 30000,
        idle: 10000 // Maximum time (in milliseconds) a connection can be idle before being released
    }
});
exports.sequelize.authenticate().then(() => {
    console.log('Database connection established successfully!');
}).catch((error) => {
    console.error('Unable to connect to the database: \n', error);
});
