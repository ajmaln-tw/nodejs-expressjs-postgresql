import { NextFunction } from "express";
import createHttpError from "http-errors";
import { Schema, ValidationError } from "joi";


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

    try {
        const value = await schemaName.validateAsync(params);
    } catch (error) {
        if (error instanceof ValidationError) {
            const errorMessage: string = error.details[0].message;
            next(createHttpError(422, errorMessage));
        } else {
            console.log("here", error);
            next(createHttpError(500, 'Internal server error'));
        }
    }
};