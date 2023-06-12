"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const pg_1 = require("../instances/pg");
const sequelize_1 = require("sequelize");
exports.Customer = pg_1.sequelize.define("Customers", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
}, {
    tableName: "Customers",
    timestamps: false,
});
