import jwt from 'jsonwebtoken';
import Joi from 'joi';

const { ACCESS_SECRET } = process.env;

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const extractUser = async (req, res, next) => {
    const authTokenSchema = Joi.string().pattern(/^Bearer /);

    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return next();
    }

    const { error } = authTokenSchema.validate(authHeader);

    if (error) {
        return res
            .status(422)
            .send({ message: "Authorization header must begin with 'Bearer'" });
    }

    const authToken = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(authToken, ACCESS_SECRET);
    } catch (err) {
        console.log(err);
        return res.status(401).send({ message: 'Unauthorized' });
    }

    if (!decodedToken) {
        return res.status(498).send({ message: 'Unauthorized' });
    }

    req.user = decodedToken;
    return next();
};

export default extractUser;
