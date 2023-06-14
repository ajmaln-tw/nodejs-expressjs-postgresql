
import { User } from "../models/Users"
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "../config/config";
import _ from "lodash";


export const signIn = async (req: Request, res: Response) => {
    const { email = "", password = "" } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(401).json({ message: "Invalid Credential" });
        const id = user.id;
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) return res.status(401).json({ messages: "Invalid Credential" });
        const token = jwt.sign({ id, email }, config.tokens.jwt_token as string, { expiresIn: "1d" });
        res.status(200).json({ token });
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ errorTitle: "Error", message: 'Internal server error' });
    }
};

export const signUp = async (req: Request, res: Response) => {
    // const { error = {}, value = {} } = registerValidator(req.body);
    // if (error) return res.status(400).json({ message: error.details });
    const { email, password } = req.body;
    const credentials = _.cloneDeep(req.body);
    const profileDetails = _.omit(credentials, ["password"]);
    try {
        const isExists = await User.findOne({ where: { email } });
        if (isExists) return res.status(409).json({ message: "ALREADY_EXISTS" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await User.create({ ...profileDetails, password: hashedPassword });
        if (!result) return res.status(400).json({ message: "PROFILE_NOT" });
        const token = jwt.sign({ userId: result.id, email }, config.tokens.jwt_token as string, { expiresIn: "1d" });
        res.status(201).json({ token });
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ errorTitle: "Error", message: 'Internal server error' });
    }
};