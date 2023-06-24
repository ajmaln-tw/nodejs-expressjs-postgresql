import { sequelize } from "../instances/pg";
import { Model, DataTypes } from "sequelize";
import { User } from "./User";
import { Customer } from "./Customer";

export interface Address extends Model {
    id: number;
    userId: number;
    address: string;
    city: string;
    postalCode: number;
    country: string
}

export const Address = sequelize.define<Address>(
    "Address",

    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        address: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        },
        postalCode: {
            type: DataTypes.INTEGER
        },
        country: {
            type: DataTypes.STRING
        },
    },
    {
        tableName: "Addresses",
        timestamps: false,
    }
);
Address.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Address, { foreignKey: "userId" });