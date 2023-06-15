import Joi from 'joi';
import { schemaMessages } from '../../../config/messages';

export const getByIdParamsSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
});

export const paginationSchema = Joi.object({
    pageIndex: Joi.number().integer().min(0).required().messages({
        "string.min": schemaMessages.passwordAtLeast3,
        "string.max": schemaMessages.passwordNotGT30,
        "any.required": schemaMessages.passwordRequired
    }),
    pageSize: Joi.number().integer().min(1).required(),
    totalCount: Joi.number().integer().min(0).required(),
});

