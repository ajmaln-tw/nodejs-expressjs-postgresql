import { sequelize } from "../instances/pg";
import { Model, DataTypes } from "sequelize";
import { User } from "./User";
import { Address } from "./Address";

export interface Customers extends Model {
    id: number;
    userId: number,
    addressId: number,
    profileImage: string,
}

export const Customer = sequelize.define<Customers>(
    "Customer",
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
        profileImage: {
            type: DataTypes.STRING,
        }
    },
    {
        tableName: "Customers",
        timestamps: false,
    }
);
Customer.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
User.hasOne(Customer, { foreignKey: 'userId' });

// Establish the association between Customer and Address
Customer.hasMany(Address, { foreignKey: "customerId" });
Address.belongsTo(Customer, { foreignKey: "customerId" });
