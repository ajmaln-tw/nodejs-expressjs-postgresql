import Joi from 'joi';



const addressSchema = Joi.object({
    id: Joi.number(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    postalCode: Joi.number().integer().required()
});
export const customerDetailsSchema = Joi.object({
    id: Joi.number(),
    customerId: Joi.number().required(),
    email: Joi.string().email().required(),
    name: Joi.string().min(1).required(),
    addresses: Joi.array().items(addressSchema)

});
