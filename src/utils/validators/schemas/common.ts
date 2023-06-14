import Joi from 'joi';
import { schemaMessages } from '../../../config/messages';

export const getByIdParamsSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
});

export const paginationSchema = Joi.object({
    pageIndex: Joi.number().integer().min(0).required().messages({
        "any.required": `pageIndex${schemaMessages.required}`
    }),
    pageSize: Joi.number().integer().min(1).required().messages({
        "any.required": `pageSize${schemaMessages.required}`
    }),
    totalCount: Joi.number().integer().min(0).required().messages({
        "any.required": `totalCount${schemaMessages.required}`
    }),
});

