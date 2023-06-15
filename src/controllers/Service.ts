
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
        const { pageSize, pageIndex, totalCount } = req.query;
        const limit = parseInt(pageSize as string) || 10;
        const offset = parseInt(pageIndex as string) * limit;

        const users = await User.findAndCountAll({
            attributes: ['id', 'name', 'email', 'status'],
            limit,
            offset,
        });
        const totalPages = Math.ceil(users.count / limit);
        res.status(200).json({
            data: users.rows,
            pageIndex: parseInt(pageIndex as string),
            pageSize: limit,
            totalCount: users.count,
            totalPages,
        });
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
        res.status(200).json(data);
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ errorTitle: "Error", message: 'Internal server error' });
    }
};


export const userById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = User.findByPk(id, { raw: true })
        if (!result) return res.status(404).json({ message: "User Profile not found" });
        const data = _.omit(result, ["createdAt", "password", "updatedAt", "status"])
        res.status(200).json(data)
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ errorTitle: "Error", message: 'Internal server error' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id, ...updateData } = req.body;
        const user: any = await User.findByPk(id);
        Object.assign(user, updateData);
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ errorTitle: "Error", message: 'Internal server error' });
    }
};