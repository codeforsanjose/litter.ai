/* eslint-disable no-param-reassign */

import { fileURLToPath } from 'url';
import { getDb } from '../DB/db-connection.js';
import userModel from './User.js';
import errorHelpers from './helpers/errorHelpers.js';
import sanitizeId from './helpers/sanitizeId.js';

const __filename = fileURLToPath(import.meta.url);

const COLL_NAME = 'refreshToken';
const refreshTokenModel = {
    addToken: async ({ token, userId, expiresAt, createdAt }) => {
        const userObjId = sanitizeId(userId);

        try {
            /**
             * @type {import('mongodb').Db}
             */
            const db = await getDb();
            await db.collection(COLL_NAME).insertOne({
                token,
                userId: userObjId,
                expiresAt,
                createdAt,
                revoked: false,
            });
        } catch (error) {
            throw await errorHelpers.transformDatabaseError(
                error,
                __filename,
                'refreshTokenModel.addToken',
            );
        }
    },

    updateRevokedToTrue: async ({ token }) => {
        try {
            /**
             * @type {import('mongodb').Db}
             */
            const db = await getDb();
            const result = await db
                .collection(COLL_NAME)
                .findOneAndUpdate(
                    { token },
                    { $set: { revoked: true } },
                    { returnDocument: 'after' },
                );
            return result;
        } catch (error) {
            throw await errorHelpers.transformDatabaseError(
                error,
                __filename,
                'refreshTokenModel.addToken',
            );
        }
    },

    validateToken: async ({ token }) => {
        try {
            /**
             * @type {import('mongodb').Db}
             */
            const db = await getDb();
            const tokenDocument = await db
                .collection(COLL_NAME)
                .findOne({ token }, {});
            if (!tokenDocument || tokenDocument.revoked) {
                return { valid: false, userData: {} };
            }
            const userDoc = await userModel.findById(tokenDocument.userId);
            if (!userDoc) {
                throw new Error('User document could not be located');
            }

            return {
                valid: true,
                userData: {
                    _id: userDoc._id,
                    email: userDoc.email,
                    username: userDoc.username,
                    zipCode: userDoc.zipCode,
                },
            };
        } catch (error) {
            throw await errorHelpers.transformDatabaseError(
                error,
                __filename,
                'refreshTokenModel.addToken',
            );
        }
    },

    removeExpDocs: async () => {
        try {
            /**
             * @type {import('mongodb').Db}
             */
            const db = await getDb();
            const result = await db
                .collection(COLL_NAME)
                .deleteMany({ expiresAt: { $lte: new Date() } });
            return result;
        } catch (error) {
            throw await errorHelpers.transformDatabaseError(
                error,
                __filename,
                'refreshTokenModel.addToken',
            );
        }
    },
};
export default refreshTokenModel;
