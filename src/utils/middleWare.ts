
/* eslint-disable indent */
import jwt from "jsonwebtoken";
import { Users } from "../models/Users";
import { ERROR_MSG } from "../config/messages";
import { ERROR_CODE } from "../config/constants";
import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import { config } from "../config/config";

// TODO :- check JWT_SECRET
// TODO :- bearer token
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token: string | undefined = req.query.token as string || req.headers.authorization as string;
        if (!token) {
            return res.status(401).json({ message: "Token Required for accessing this resource", errorCode: ERROR_CODE.TOKEN_REQUIRED });
        }
        if (!token.length) {
            return res.status(403).json({ message: "Invalid token", errorCode: ERROR_CODE.INVALID_TOKEN });
        }
        token = token.split(" ")[1];
        const decodedToken: any = jwt.verify(token, config.tokens.jwt_token as string);
        const { userId = "" } = decodedToken;
        const user = await Users.findByPk(userId);
        if (!user) {
            return res.status(404).json(ERROR_MSG.USER_NOT);
        }
        if (!user.status) {
            return res.status(401).json({ message: "User blocked from accessing resources" });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: (error as Error).message });
    }
};

