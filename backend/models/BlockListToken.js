import { fileURLToPath } from 'url';

import { getBlockListCollection } from '../DB/collections.js';
import errorHelpers from './helpers/errorHelpers.js';

const __filename = fileURLToPath(import.meta.url);
/**
 * @type {import('mongodb').Collection}
 */

const blockListCollection = getBlockListCollection;

const blockListModel = {
    addTokenToList: async (token, expires) => {
        try {
            await blockListCollection.insertOne({
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
            return await blockListCollection.findOne(
                { token },
                { projection: { token: 1 } },
            );
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
            const cursor = blockListCollection.find(
                {},
                { projection: { $token: 1 } },
            );
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
export default blockListModel;
