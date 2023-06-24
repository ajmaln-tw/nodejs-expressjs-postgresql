
import { User, UserInstance } from "../models/User"
import { Customer } from "../models/Customer"
import { Request, Response } from "express";

import _ from "lodash";

import { TYPE_OF_USER, TYPE_OF_USER_NAME } from "../config/constants";
import { Address } from "../models/Address";
import { formatUserBasicDetails } from "./utilts";
import { Op } from "sequelize";


export const customers = async (req: Request, res: Response) => {
    try {
        const { pageSize, pageIndex, totalCount } = req.query;
        const limit = parseInt(pageSize as string) || 10;
        const offset = parseInt(pageIndex as string) * limit;

        const customers = await Customer.findAndCountAll({
            include: [
                {
                    model: User,
                    attributes: ["id", "name", "email"]
                },
                {
                    model: Address,
                    attributes: ["id", "address", "city", "postalCode", "country"]
                }
            ],
            order: [['id', 'ASC']],
            limit,
            offset,
        });
        if (!customers) return res.status(400).json({ message: "No Records Found" });

        const totalPages = Math.ceil(customers.count / limit);
        res.status(200).json({
            data: customers.rows,
            pageIndex: parseInt(pageIndex as string),
            pageSize: limit,
            totalCount: customers.count,
            totalPages,
        });
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ errorTitle: "Error", message: 'Internal server error' });
    }
};

export const createCustomer = async (req: Request, res: Response) => {
    const { id, name, address: addresses = [] } = req.body;

    try {
        const user: UserInstance | any = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "Customer not found" });
        }
        user.name = name;
        await user.save();

        const customer = await Customer.create({ userId: id });
        // Create the addresses and associate with the customer
        const createdAddresses = await Promise.all(
            addresses.map((address: any) =>
                Address.create({ customerId: customer.id, ...address })
            )
        );
        res.status(201).json({ ...formatUserBasicDetails(user), address: createdAddresses });
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ errorTitle: "Error", message: 'Internal server error' });
    }
};

export const updateCustomer = async (req: Request, res: Response) => {
    const { name, addresses = [] } = req.body;
    const { id: customerId } = req.params;
    const userId = _.get(req, "user");
    try {
        if (addresses.length > 9) return res.status(400).json({ message: "Address Entries limit exceeded" })
        const user: UserInstance | any = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "Customer not found" });
        }
        user.name = name;
        await user.save();

        //if address already exists save to db
        //not exists, save to data to db
        const existingAddresses = await Address.findAll({ where: { customerId: customerId }, raw: true });
        const existingAddressIds = existingAddresses.map((address) => address.id);
        const updatedAddresses = [];
        const createdAddresses = [];
        const removedAddressIds = [];
        // Loop through addresses and determine if they are new or existing
        for (const address of addresses) {

            if (address.id && existingAddressIds.includes(address.id)) {
                // Existing address, update it
                await Address.update(address, { where: { id: address.id } });
                updatedAddresses.push(address);
            }
            else if (!address.id && !existingAddressIds.includes(address.id)) {
                // New address, create it
                const createdAddress = await Address.create({ customerId: parseInt(customerId), ...address });
                console.log("here", createdAddress);
                let result = createdAddress.dataValues
                createdAddresses.push(_.omit(result, ["customerId", "userId"]));
            }
        }
        for (const address of existingAddresses) {
            if (!addresses.some((a: any) => a.id === address.id)) {
                removedAddressIds.push(address.id);
            }
        }
        if (removedAddressIds.length > 0) {
            await Address.destroy({ where: { id: { [Op.in]: removedAddressIds } } });
        }
        let newAddress = [...updatedAddresses, ...createdAddresses];
        let updatedData = { customerId: parseInt(customerId), ...formatUserBasicDetails(user), addresses: newAddress }
        res.status(201).json({ data: updatedData });
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ errorTitle: "Error", message: 'Internal server error' });
    }
};

export const customerById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = _.get(req, "user");
    try {
        const customer = await Customer.findOne({ where: { id: id } });
        const user = await User.findByPk(userId, { raw: true });
        const addresses = await Address.findAll({
            attributes: ['id', 'address', 'postalCode', 'city', 'country'],
            where: { customerId: customer?.id }, raw: true
        })
        if (!user) return res.status(404).json({ message: "No User Found" });
        res.status(200).json({ data: { customerId: parseInt(id), ...formatUserBasicDetails(user), addresses } });
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
            order: [['id', 'ASC']],
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
        const result = await User.findByPk(id, { raw: true })
        if (!result) return res.status(404).json({ message: "User Profile not found" });
        const data = _.omit(result, ["createdAt", "password", "updatedAt"])
        const updatedResult = {
            ...data,
            typeofUser: {
                id: data.typeofUser,
                name: TYPE_OF_USER_NAME[data.typeofUser as keyof typeof TYPE_OF_USER_NAME],
            },
        };
        res.status(200).json(updatedResult)
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ errorTitle: "Error", message: 'Internal server error' });
    }
};

export const deleteUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await User.destroy({ where: { id: id } })
        res.status(200).json({})
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ errorTitle: "Error", message: 'Internal server error' });
    }
};

export const updateUser = async (req: Request, res: Response) => {

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
        res.status(201).json(updatedResult);
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ errorTitle: "Error", message: 'Internal server error' });
    }
};