import { fileURLToPath } from 'url';

import { getBlacklistCollection } from '../DB/collections.js';
import errorHelpers from './helpers/errorHelpers.js';

const __filename = fileURLToPath(import.meta.url);
/**
 * @type {import('mongodb').Collection}
 */

const blacklistCollection = getBlacklistCollection;

const BlacklistToken = {
  addTokenToList: async (token, expires) => {
    try {
      await blacklistCollection.insertOne({
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
      return await blacklistCollection.findOne(
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
      const cursor = blacklistCollection.find(
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
export default BlacklistToken;
