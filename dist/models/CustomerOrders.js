"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerOrder = void 0;
const pg_1 = require("../instances/pg");
const sequelize_1 = require("sequelize");
exports.CustomerOrder = pg_1.sequelize.define("CustomerOrder", {
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
    productId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'Products',
            key: 'id'
        }
    },
    orderDate: {
        type: sequelize_1.DataTypes.DATE,
    }
}, {
    tableName: "CustomerOrders",
    timestamps: false,
});
