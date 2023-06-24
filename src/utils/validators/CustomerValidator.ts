


import { NextFunction, Request, Response } from 'express';
import { queryValidator, validator } from './validator';
import { getByIdParamsSchema, paginationSchema } from './schemas/common';
import { customerDetailsSchema } from './schemas/Customers';

export const validateCustomerDetails = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    validator(customerDetailsSchema, req.body, next);
};
