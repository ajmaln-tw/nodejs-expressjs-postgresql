import dotenv from "dotenv";

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 0;
const PG_PORT = process.env.PG_PORT || "";

export const config = {
    server: {
        port: SERVER_PORT
    },
    pg: {
        name: process.env.PG_DB,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        host: process.env.PG_HOST,
        port: PG_PORT
    },
    tokens: {
        jwt_token: process.env.JWT_SECRET
    }
};
