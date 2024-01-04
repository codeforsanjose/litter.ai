/* eslint-disable no-else-return */
import jwt from 'jsonwebtoken';
import Joi from 'joi';

const { ACCESS_SECRET } = process.env;

const isAuthAccess = async (req, res, next) => {
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

    let decodedToken;
    try {
        decodedToken = jwt.verify(authToken, ACCESS_SECRET);
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).send({
                status: 'error',
                errorCode: 'EXPIRED_TOKEN',
                message: 'Your token has expired. Please refresh the token.',
            });
        } else if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).send({
                status: 'error',
                errorCode: 'INVALID_TOKEN',
                message: 'Your token is invalid.',
            });
        } else {
            return res.status(500).send({
                status: 'error',
                errorCode: 'SERVICE_ERROR',
                message: 'Internal server error.',
            });
        }
    }

    req.user = decodedToken;
    return next();
};

export default isAuthAccess;
