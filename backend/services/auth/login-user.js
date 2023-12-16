import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../../models/User.js';

const { JWT_SECRET } = process.env;

const loginUserService = async (body) => {
    let { email } = body;
    const { password } = body;
    email = email.toLowerCase().trim();

    // Validate user credentials
    const result = await userModel.findByEmail(email);
    if (!result) {
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

    // Sign token
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

    return {
        user: {
            _id: result._id,
            username: result.username,
            displayUsername: result.displayUsername,
            email: result.email,
            firstName: result.firstName,
            lastName: result.lastName,
            zipCode: result.zipCode,
        },
        token,
    };
};

export default loginUserService;
