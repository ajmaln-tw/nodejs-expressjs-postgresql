import { sequelize } from "../instances/pg";
import { Model, DataTypes } from "sequelize";

export interface Customers extends Model {
    id: number;
    userId: number,
}

export const Customer = sequelize.define<Customers>(
    "Customers",
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
    },
    {
        tableName: "Customers",
        timestamps: false,
    }
);
