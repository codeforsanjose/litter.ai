import jwt from 'jsonwebtoken';
import refreshTokenModel from '../../models/RefreshToken.js';

const logoutUserService = async (token) => {
    const { REFRESH_SECRET } = process.env;
    const decodedToken = jwt.verify(token, REFRESH_SECRET);

    if (!decodedToken) {
        const error = new Error('Unable to decode token.');
        // @ts-ignore
        error.statusCode(400);
        throw error;
    }

    const result = await refreshTokenModel.updateRevokedToTrue({ token });
    return result;
};

export default logoutUserService;
