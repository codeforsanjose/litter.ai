import Joi from 'joi';

export const categoryLeaderboardParamSchema = Joi.string()
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
    .required();

export const getLeaderboardTotalSchema = Joi.object({
    page: Joi.number().min(1).max(1000),
    perPage: Joi.number().min(1).max(50),
});
