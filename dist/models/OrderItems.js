"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
const pg_1 = require("../instances/pg");
const sequelize_1 = require("sequelize");
exports.Products = pg_1.sequelize.define("OrderItems", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    orderId: {
        type: sequelize_1.DataTypes.STRING,
        references: {
            model: 'CustomerOrders',
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
    quantity: {
        type: sequelize_1.DataTypes.INTEGER
    },
    totalAmount: {
        type: sequelize_1.DataTypes.INTEGER
    }
}, {
    tableName: "OrderItems",
    timestamps: false,
});
