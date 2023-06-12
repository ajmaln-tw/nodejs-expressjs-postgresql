
import { User } from "../models/Users"
import { Customer } from "../models/Customers"
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { config } from "../config/config";
import _ from "lodash";
import { CustomRequest } from "../common/interface";
import fs from "fs/promises"
import path from "path";

export const customers = async (req: Request, res: Response) => {
    try {
        const user = await Customer.findAll();
        if (!user) return res.status(404).json({ message: "No Records Found" });
        res.status(200).json({ data: user });
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ errorTitle: "Error", message: 'Internal server error' });
    }
};

export const customerById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await Customer.findOne({ where: { userId: id } });
        if (!user) return res.status(404).json({ message: "No User Found" });
        res.status(200).json({ data: user });
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ errorTitle: "Error", message: 'Internal server error' });
    }
};

export const users = async (req: Request, res: Response) => {
    try {
        const user = await User.findAll();
        if (!user) return res.status(404).json({ message: "No Records Found" });
        const filePath = path.join(__dirname, 'dummy.json');
        const fileContents = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileContents);
        res.status(200).json(jsonData);
        // res.status(200).json({ data: user });
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ errorTitle: "Error", message: 'Internal server error' });
    }
};

export const getProfile = async (req: Request, res: Response) => {
    try {
        const id = _.get(req, "user", 1)
        const result = await User.findByPk(id, { raw: true });
        if (!result) return res.status(404).json({ message: "User Profile not found" });
        const data = _.omit(result, ["createdAt", "password", "updatedAt", "status"])
        console.log(data)
        res.status(200).json(data);
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ errorTitle: "Error", message: 'Internal server error' });
    }
};

