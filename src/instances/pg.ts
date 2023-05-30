import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { config } from "../config/config";

const { name, user, password, host, port } = config.pg;
dotenv.config();

export const sequelize = new Sequelize({
     database: name as string,
     username: user as string,
     password: password as string,
     host: host as string,
     port: parseInt(port),
     dialect: "postgres",
     pool: {
          max: 10, // Maximum number of connections
          min: 2, // Minimum number of connections
          acquire: 30000, // Maximum time (in milliseconds) to acquire a connection
          idle: 10000 // Maximum time (in milliseconds) a connection can be idle before being released
     }
});


sequelize.authenticate().then(() => {
     console.log('Database connection established successfully!');
}).catch((error) => {
     console.error('Unable to connect to the database: \n', error);
});
sequelize.sync({ alter: true })