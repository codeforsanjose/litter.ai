import jwt from 'jsonwebtoken';
import blockListModel from '../../models/BlockListToken.js';

const logoutUserService = async (token) => {
    const decodedToken = jwt.decode(token);

    if (!decodedToken) {
        const error = new Error('Unable to decode token.');
        error.statusCode(400);
        throw error;
    }

    const result = await blockListModel.addTokenToList(token, decodedToken.exp);
    return result;
};

export default logoutUserService;
