import _ from "lodash";
import { sequelize } from "../instances/pg";


export const getOnlineUser = async (activeUserIds: any) => {
    try {
        if (activeUserIds.length === 0) {
            return [];
        }
        let id = activeUserIds.map(({ userId }: { userId: any }) => userId);
        const query = `SELECT id, name, email FROM Users WHERE id IN (${id.join(",")})`;
        const [results] = await sequelize.query(query);

        const activeUsers = results.map((row: any) => ({
            id: row.id,
            name: row.name,
            email: row.email,
        }));

        return activeUsers;
    } catch (error) {
        console.log("Error", error);
        throw new Error("Error retrieving online user details");
    }
};