import { sequelize } from "../instances/pg";
import { Model, DataTypes, IntegerDataType } from "sequelize";

export interface Products extends Model {
    id: number;
    orderId: number
    productId: number,
    quantity: number,
    totalAmount: number
}

export const Products = sequelize.define<Products>(
    "Products",
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        orderId: {
            type: DataTypes.STRING,
            references: {
                model: 'CustomerOrders',
                key: 'id'
            }
        },
        productId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Products',
                key: 'id'
            }
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        totalAmount: {
            type: DataTypes.INTEGER
        }
    },
    {
        tableName: "Products",
        timestamps: false,
    }
);