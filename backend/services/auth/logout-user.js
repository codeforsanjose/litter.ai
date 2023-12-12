import jwt from 'jsonwebtoken';
import blackListToken from '../../models/BlacklistToken.js';

const logoutUserService = async (token) => {
    const decodedToken = jwt.decode(token);

    if (!decodedToken) {
        const error = new Error('Unable to decode token.');
        error.statusCode(400);
        throw error;
    }

    const result = await blackListToken.addTokenToList(token, decodedToken.exp);
    return result;
};

export default logoutUserService;
