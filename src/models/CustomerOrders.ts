import { sequelize } from "../instances/pg";
import { Model, DataTypes } from "sequelize";

export interface CustomerOrderInstance extends Model {
    id: number;
    userId: number,
    productId: number
    orderDate: Date;
}

export const CustomerOrder = sequelize.define<CustomerOrderInstance>(
    "CustomerOrder",
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
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
        orderDate: {
            type: DataTypes.DATE,
        }
    },
    {
        tableName: "CustomerOrders",
        timestamps: false,
    }
);
