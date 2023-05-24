import { sequelize } from "../instances/pg";
import { Model, DataTypes } from "sequelize";

export interface UserInstance extends Model {
    id: number;
    name: string,
    password: string;
    email: string;
    status: boolean;
}

export const Users = sequelize.define<UserInstance>(
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
    },
    {
        tableName: "users",
        timestamps: true,
    }
);
