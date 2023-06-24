"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const pg_1 = require("../instances/pg");
const sequelize_1 = require("sequelize");
const User_1 = require("./User");
exports.Address = pg_1.sequelize.define("Address", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    address: {
        type: sequelize_1.DataTypes.STRING
    },
    city: {
        type: sequelize_1.DataTypes.STRING
    },
    postalCode: {
        type: sequelize_1.DataTypes.INTEGER
    },
    country: {
        type: sequelize_1.DataTypes.STRING
    },
}, {
    tableName: "Addresses",
    timestamps: false,
});
exports.Address.belongsTo(User_1.User, { foreignKey: "userId" });
User_1.User.hasMany(exports.Address, { foreignKey: "userId" });
