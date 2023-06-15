import { NextFunction } from "express";
import createHttpError from "http-errors";
import { Schema } from "joi";


export const validator = async (schemaName: any, body: any, next: NextFunction) => {
    const value = await schemaName.validate(body);
    try {
        value.error
            ? next(createHttpError(422, value.error.details[0].message))
            : next();
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
    }
};

export const queryValidator = async (schemaName: Schema, params: any, next: NextFunction) => {
    const value = await schemaName.validate(params);
    try {
        value.error
            ? next(createHttpError(400, value.error.details[0].message))
            : next();
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log("here", error)
        console.log(error);
    }
};