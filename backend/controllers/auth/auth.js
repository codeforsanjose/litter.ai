import { loginSchema, registerSchema } from './authReqBodySchemas.js';
import loginUserService from '../../services/auth/login-user.js';
import logoutUserService from '../../services/auth/logout-user.js';
import registerUserService from '../../services/auth/register-user.js';

const authController = {
    postRegister: async (req, res, next) => {
        // TODO: add rate limiting
        // TODO: add captcha
        try {
            // Validate request body
            const { error } = registerSchema.validate(req.body);
            if (error) {
                console.log(error);
                if (
                    error.message === '"confirmPassword" must be [ref:password]'
                ) {
                    return res.status(422).send({
                        message: 'Validation Error',
                        error: 'Passwords must match',
                    });
                }
                return res.status(422).send({
                    message: 'Validation Error',
                    error: error.details[0].message,
                });
            }

            // Create new user
            const result = await registerUserService(req.body);

            // If result is null but somehow no error was thrown
            if (!result) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Internal Service Error',
                });
            }

            // send a response with registration data
            return res.status(201).send(result);
        } catch (error) {
            return next(error);
        }
    },

    postLogin: async (req, res, next) => {
        // TODO: add delay methods
        // TODO: add lockout method
        try {
            // Validate request body
            const { error } = loginSchema.validate(req.body);
            if (error) {
                return res.status(422).send({
                    message: 'Validation Error',
                    error: error.details[0].message,
                });
            }

            const result = await loginUserService(req.body);

            return res.status(200).send(result);
        } catch (error) {
            return next(error);
        }
    },

    postLogout: async (req, res, next) => {
        try {
            const authHeader = req.get('Authorization');
            const token = authHeader.split(' ')[1];

            await logoutUserService(token);
            return res.status(200).send({ message: 'Logged out user' });
        } catch (error) {
            return next(error);
        }
    },
};

export default authController;
