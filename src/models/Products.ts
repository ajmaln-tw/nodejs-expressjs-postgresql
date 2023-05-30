import { sequelize } from "../instances/pg";
import { Model, DataTypes, IntegerDataType } from "sequelize";

export interface Products extends Model {
    id: number;
    name: string
    price: IntegerDataType;
}

export const Products = sequelize.define<Products>(
    "Products",
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.INTEGER
        }
    },
    {
        tableName: "Products",
        timestamps: false,
    }
);
