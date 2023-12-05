import Joi from 'joi';

export const registerSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required().min(6).max(32),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required(),
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    zipCode: Joi.string().length(5).required(),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(32).required(),
});

export const authTokenSchema = Joi.string().pattern(/^Bearer /);
