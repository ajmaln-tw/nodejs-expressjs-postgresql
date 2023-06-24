import { TYPE_OF_USER } from "../config/constants";
import { sequelize } from "../instances/pg";
import { Model, DataTypes } from "sequelize";
import { Customer } from "./Customer";

export interface UserInstance extends Model {
    id: number;
    name: string,
    password: string;
    email: string;
    status: boolean;
    typeofUser: string
}

export const User = sequelize.define<UserInstance>(
    "Users",
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        typeofUser: {
            type: DataTypes.STRING,
            defaultValue: "1100",
            validate: {
                isIn: [TYPE_OF_USER], // Validation check
            },
        }
    },
    {
        tableName: "Users",
        timestamps: true,
    }
);
