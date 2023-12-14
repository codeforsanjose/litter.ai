import bcrypt from 'bcrypt';
import userModel from '../../models/User.js';

const registerUserService = async (body) => {
    const { username, email, password, firstName, lastName, zipCode } = body;

    // Check if username or email in use
    let emailUserDoc;
    let usernameUserDoc;
    try {
        emailUserDoc = await userModel.findByEmail(email);
        usernameUserDoc = await userModel.findByUsername(username);
    } catch (error) {
        const err = new Error(`Internal Service Error: ${error.message}`);
        err.statusCode = 500;
        throw error;
    }

    if (emailUserDoc && emailUserDoc?.status !== 'pending') {
        const error = new Error('Username or Email already in use');
        error.statusCode = 409;
        throw error;
    }
    if (usernameUserDoc && usernameUserDoc?.status !== 'pending') {
        const error = new Error('Username or Email already in use');
        error.statusCode = 409;
        throw error;
    }

    if (emailUserDoc) {
        await userModel.delete(emailUserDoc._id);
    }

    if (usernameUserDoc) {
        await userModel.delete(usernameUserDoc._id);
    }

    const hashedPass = await bcrypt.hash(password, 10);

    // Create user
    try {
        await userModel.create(
            username,
            email,
            hashedPass,
            firstName,
            lastName,
            zipCode,
        );
    } catch (error) {
        const err = new Error(`Internal Service Error: ${error.message}`);
        err.statusCode = 500;
        throw error;
    }

    return { status: 'pending' };
};

export default registerUserService;
