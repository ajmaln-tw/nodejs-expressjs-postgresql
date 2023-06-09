"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
const pg_1 = require("../instances/pg");
const sequelize_1 = require("sequelize");
exports.Products = pg_1.sequelize.define("Products", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER
    }
}, {
    tableName: "Products",
    timestamps: false,
});
