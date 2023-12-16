import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../../models/User.js';

const { JWT_SECRET } = process.env;

const registerUserService = async (body) => {
    const { username, email, password, firstName, lastName, zipCode } = body;

    // Check if username or email in use
    if (
        (await userModel.findByEmail(email)) ||
        (await userModel.findByUsername(username))
    ) {
        const error = new Error('Username or Email already in use');
        error.statusCode = 409;
        throw error;
    }

    const hashedPass = await bcrypt.hash(password, 10);

    // Create user
    const result = await userModel.create(
        username,
        email,
        hashedPass,
        firstName,
        lastName,
        zipCode,
    );

    // Sign Token
    let token;
    try {
        token = jwt.sign(
            {
                _id: result._id,
                username: result.username,
                email: result.email,
            },
            JWT_SECRET,
        );
    } catch (error) {
        error.statusCode = 500;
        error.message = `Internal Service Error: ${error.message}`;
        throw error;
    }

    return { user: { ...result }, token };
};

export default registerUserService;
