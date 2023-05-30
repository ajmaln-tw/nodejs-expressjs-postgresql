
import { User } from "../models/Users"
import { Customer } from "../models/Customers"
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { config } from "../config/config";
import _ from "lodash";


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
        res.status(200).json({ data: user });
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ errorTitle: "Error", message: 'Internal server error' });
    }
};