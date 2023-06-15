import Joi from 'joi';


export const userDetailsSchema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(1).required(),
    status: Joi.boolean().required(),
});
