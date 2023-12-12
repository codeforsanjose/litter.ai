// Remember to check the blacklist

import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import Joi from 'joi';
import logError from '../Errors/log-error.js';
import blackListToken from '../models/BlacklistToken.js';

const __filename = fileURLToPath(import.meta.url);

/**
 * @type {import('mongodb').Collection}
 */

const { JWT_SECRET } = process.env;
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
// TODO: Create a file somewhere that runs an interval once an hour to clear out tokens
// that have an expires date greater than now

// TODO: ALWAYS INCLUDE AN INDEX FOR TOKEN, DO THIS IN COMPASS!
const isAuth = async (req, res, next) => {
    const authTokenSchema = Joi.string().pattern(/^Bearer /);

    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(422).send({
            status: 'error',
            message: 'Authentication token is required for this endpoint.',
        });
    }

    const { error } = authTokenSchema.validate(authHeader);
    if (error) {
        return res.status(422).send({
            status: 'error',
            message: "Authorization header must begin with 'Bearer'",
        });
    }

    const authToken = authHeader.split(' ')[1];
    const isBlacklisted = await blackListToken.getToken(authToken);

    try {
        if (isBlacklisted) {
            return res
                .status(401)
                .send({ status: 'error', message: 'Invalid Token' });
        }
    } catch (err) {
        console.log(err);
        logError(err, __filename, 'isAuth');
        return res
            .status(500)
            .send({ status: 'error', message: 'Internal Service Error' });
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(authToken, JWT_SECRET);
    } catch (err) {
        console.log(err);
        return res.status(401).send({
            status: 'error',
            message: 'Unauthorized',
            error: err.message,
        });
    }

    if (!decodedToken) {
        return res
            .status(401)
            .send({ status: 'error', message: 'Unauthorized' });
    }

    req.user = decodedToken;
    return next();
};

export default isAuth;
