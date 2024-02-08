import jwt from 'jsonwebtoken';
import { loginSchema, registerSchema } from './authReqBodySchemas.js';
import loginUserService from '../../services/auth/login-user.js';
import logoutUserService from '../../services/auth/logout-user.js';
import registerUserService from '../../services/auth/register-user.js';
import refreshTokenModel from '../../models/RefreshToken.js';

const { ACCESS_SECRET, REFRESH_SECRET, NODE_ENV, DOMAIN } = process.env;
const authController = {
    /**
     * Handle user registration.
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    postRegister: async (req, res, next) => {
        // TODO: add rate limiting
        // TODO: add captcha

        try {
            // Validate request body
            const { error } = registerSchema.validate(req.body);
            if (error) {
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
    /**
     * Handle user login.
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
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

            const { response, refreshToken } = await loginUserService(req.body);
            if (NODE_ENV === 'dev') {
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                    secure: true,
                    sameSite: 'lax',
                });
            } else {
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                    secure: true,
                    sameSite: 'None',
                    domain: DOMAIN, // Allows cookie to be shared across subdomains
                });
            }
            return res.status(200).send(response);
        } catch (error) {
            return next(error);
        }
    },

    /**
     * Handle user logout.
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    postLogout: async (req, res, next) => {
        const token = req.cookies.refreshToken;
        try {
            await logoutUserService(token);
            return res.status(200).send({ message: 'Logged out user' });
        } catch (error) {
            return next(error);
        }
    },

    /**
     * Handle token refresh.
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    getRefreshToken: async (req, res, next) => {
        try {
            // Extract the refresh token from the HttpOnly cookie
            const { refreshToken } = req.cookies;
            if (!refreshToken) {
                return res
                    .status(401)
                    .json({ message: 'Refresh token is required' });
            }

            // Verify the refresh token
            try {
                jwt.verify(refreshToken, REFRESH_SECRET);
            } catch (err) {
                return res
                    .status(403)
                    .json({ message: 'Invalid refresh token' });
            }

            // Check if the token is in the database and not revoked
            const { valid, userData } = await refreshTokenModel.validateToken({
                token: refreshToken,
            });
            console.log(valid, userData);
            if (!valid) {
                return res
                    .status(403)
                    .json({ message: 'Invalid or revoked refresh token' });
            }

            // The refreshToken is valid, create a new access token
            const newAccessToken = jwt.sign({ ...userData }, ACCESS_SECRET, {
                expiresIn: '15m',
            });

            return res.status(200).json({ token: newAccessToken });
        } catch (error) {
            return next(error);
        }
    },
};

export default authController;
