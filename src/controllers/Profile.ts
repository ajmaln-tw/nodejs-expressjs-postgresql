
import { User, UserInstance } from "../models/User"
import { Customer } from "../models/Customer"
import { Request, Response } from "express";

import _ from "lodash";
import { TYPE_OF_USER_NAME } from "../config/constants";
import { Address } from "../models/Address";




export const profileById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await User.findByPk(id, { raw: true })
        if (!result) return res.status(404).json({ message: "User Profile not found" });
        const data = _.omit(result, ["createdAt", "password", "updatedAt", "status", "typeofUser"]);
        const addresses = await Address.findAll({ where: { userId: id } })
        const userDetails = {
            ...data,
            addresses: addresses || []
        };
        res.status(200).json(userDetails)
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ errorTitle: "Error", message: 'Internal server error' });
    }
};

;

export const updateProfile = async (req: Request, res: Response) => {

    try {
        const id = req.params.id;
        const { id: userId, ...updateData } = req.body;
        _.set(updateData, "typeofUser", _.get(updateData, "typeofUser.id"))
        const user: UserInstance | any = await User.findByPk(id);
        Object.assign(user, updateData);
        await user.save();
        const result = _.pick(user, ["id", "name", "email", "status", "typeofUser"]);
        const updatedResult = {
            ...result,
            typeofUser: {
                id: result.typeofUser,
                name: TYPE_OF_USER_NAME[result.typeofUser as keyof typeof TYPE_OF_USER_NAME],
            },
        };
        console.log("here", result);
        console.log("here updatedResult", updatedResult);
        res.status(201).json(updatedResult);
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ errorTitle: "Error", message: 'Internal server error' });
    }
};