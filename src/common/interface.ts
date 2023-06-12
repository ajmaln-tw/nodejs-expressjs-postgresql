import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
    user: number;
}

export { CustomRequest }