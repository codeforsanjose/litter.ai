import Joi from 'joi';

export const postPhotoBodySchema = Joi.object({
    category: Joi.string()
        .valid(
            'paper',
            'cardboard',
            'compost',
            'metal',
            'glass',
            'plastic',
            'trash',
            'other',
            'unknown',
        )
        .required(),
    email: Joi.string().email().required(),
});

export const getUserPhotoCountParamSchema = Joi.object({
    username: Joi.string().required(),
});

export default postPhotoBodySchema;
