// @ts-nocheck
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../../models/User.js';
import refreshTokenModel from '../../models/RefreshToken.js';

const { REFRESH_SECRET, ACCESS_SECRET } = process.env;

const loginUserService = async (body) => {
    let { email } = body;
    const { password } = body;
    email = email.toLowerCase().trim();

    // Validate user credentials
    const result = await userModel.findByEmail(email);
    if (!result || result.status === 'pending') {
        const error = new Error('Incorrect Email or Password');
        error.statusCode = 401;
        throw error;
    }

    const validPass = await bcrypt.compare(password, result.password);
    if (!validPass) {
        const error = new Error('Incorrect Email or Password');
        error.statusCode = 401;
        throw error;
    }

    // Sign tokens
    let accessToken = '';
    let refreshToken = '';

    try {
        accessToken = jwt.sign(
            {
                _id: result._id,
                username: result.username,
                email: result.email,
                zipCode: result.zipCode,
            },
            ACCESS_SECRET,
            { expiresIn: '15m' },
        );
    } catch (error) {
        error.statusCode = 500;
        error.message = `Error creating Access Token: ${error.message}`;
        throw error;
    }

    try {
        refreshToken = jwt.sign(
            {
                _id: result._id,
            },
            REFRESH_SECRET,
            { expiresIn: '30d' },
        );

        const decoded = jwt.decode(refreshToken);
        const createdAt = new Date(decoded.iat * 1000);
        const expiresAt = new Date(decoded.exp * 1000);
        await refreshTokenModel.addToken({
            token: refreshToken,
            userId: result._id,
            createdAt,
            expiresAt,
        });
    } catch (error) {
        error.statusCode = 500;
        error.message = `Error creating Refresh Token: ${error.message}`;
        throw error;
    }

    return {
        response: {
            user: {
                _id: result._id,
                username: result.username,
                displayUsername: result.displayUsername,
                email: result.email,
                firstName: result.firstName,
                lastName: result.lastName,
                zipCode: result.zipCode,
            },
            token: accessToken,
        },
        refreshToken,
    };
};

export default loginUserService;
