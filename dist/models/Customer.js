"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const pg_1 = require("../instances/pg");
const sequelize_1 = require("sequelize");
const User_1 = require("./User");
const Address_1 = require("./Address");
exports.Customer = pg_1.sequelize.define("Customer", {
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
exports.Customer.belongsTo(User_1.User, { foreignKey: 'userId', targetKey: 'id' });
User_1.User.hasOne(exports.Customer, { foreignKey: 'userId' });
// Establish the association between Customer and Address
exports.Customer.hasMany(Address_1.Address, { foreignKey: "customerId" });
Address_1.Address.belongsTo(exports.Customer, { foreignKey: "customerId" });
