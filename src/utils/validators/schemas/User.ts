import Joi from 'joi';


export const userDetailsSchema = Joi.object({
    id: Joi.number(),
    email: Joi.string().email().required(),
    name: Joi.string().min(1).required(),
    status: Joi.boolean().required(),
    typeofUser: Joi.object({
        id: Joi.number().required(),
        name: Joi.string().required()
    }).required(),

});
