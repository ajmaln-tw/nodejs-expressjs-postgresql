"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const constants_1 = require("../config/constants");
const pg_1 = require("../instances/pg");
const sequelize_1 = require("sequelize");
exports.User = pg_1.sequelize.define("Users", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
    typeofUser: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "1100",
        validate: {
            isIn: [constants_1.TYPE_OF_USER], // Validation check
        },
    }
}, {
    tableName: "Users",
    timestamps: true,
});
