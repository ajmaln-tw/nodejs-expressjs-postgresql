"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnlineUser = void 0;
const pg_1 = require("../instances/pg");
const getOnlineUser = (activeUserIds) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (activeUserIds.length === 0) {
            return [];
        }
        let id = activeUserIds.map(({ userId }) => userId);
        const query = `SELECT id, name, email FROM Users WHERE id IN (${id.join(",")})`;
        const [results] = yield pg_1.sequelize.query(query);
        const activeUsers = results.map((row) => ({
            id: row.id,
            name: row.name,
            email: row.email,
        }));
        return activeUsers;
    }
    catch (error) {
        console.log("Error", error);
        throw new Error("Error retrieving online user details");
    }
});
exports.getOnlineUser = getOnlineUser;
