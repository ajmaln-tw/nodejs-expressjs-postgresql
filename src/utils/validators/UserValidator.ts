

import { NextFunction, Request, Response } from 'express';
import { queryValidator, validator } from './validator';
import { getByIdParamsSchema, paginationSchema } from './schemas/common';
import { userDetailsSchema } from './schemas/User';

export const paginationValidator = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    queryValidator(paginationSchema, req.query, next);
};

export const getByIdValidator = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    queryValidator(getByIdParamsSchema, req.query, next);
};

export const validateUserDetails = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    validator(userDetailsSchema, req.body, next);
};
