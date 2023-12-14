import { fileURLToPath } from 'url';

import errorHelpers from './helpers/errorHelpers.js';
import { getDb } from '../DB/db-connection.js';

const __filename = fileURLToPath(import.meta.url);

const collName = 'blacklistTokens';
const blackListToken = {
    addTokenToList: async (token, expires) => {
        try {
            const db = await getDb();
            await db.collection(collName).insertOne({
                token,
                expires: Date.now(expires * 1000),
            });
        } catch (error) {
            throw await errorHelpers.transformDatabaseError(
                error,
                __filename,
                'addTokenToList',
            );
        }
    },

    getToken: async (token) => {
        try {
            const db = await getDb();
            return await db
                .collection(collName)
                .findOne({ token }, { projection: { token: 1 } });
        } catch (error) {
            throw await errorHelpers.transformDatabaseError(
                error,
                __filename,
                'findOne',
            );
        }
    },

    getAllTokens: async () => {
        try {
            const db = await getDb();

            const cursor = db
                .collection(collName)
                .find({}, { projection: { $token: 1 } });
            const result = await cursor.toArray();
            return result;
        } catch (error) {
            throw await errorHelpers.transformDatabaseError(
                error,
                __filename,
                'getAllTokens',
            );
        }
    },
};
export default blackListToken;
