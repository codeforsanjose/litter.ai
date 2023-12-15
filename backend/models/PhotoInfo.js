import { fileURLToPath } from 'url';

import sanitizeId from './helpers/sanitizeId.js';
import catCountModel from './CategoryCount.js';
import errorHelpers from './helpers/errorHelpers.js';
import { getDb } from '../DB/db-connection.js';

const __filename = fileURLToPath(import.meta.url);

const collName = 'uploadsinfo';
const photoInfoModel = {
    /**
     * @typedef {Object} User
     * @property {string} username
     * @property {string | import('mongodb').ObjectId} _id
     */

    /**
     * @param {string} categoryString
     * @param {User} user
     */
    insertOne: async (categoryString, user) => {
        const userObjId = sanitizeId(user._id);
        try {
            const db = await getDb();
            // Insert new photoInfo document
            await db.collection(collName).insertOne({
                userId: userObjId,
                username: user.username,
                category: categoryString,
                createdAt: Date.now(),
            });
        } catch (error) {
            throw await errorHelpers.transformDatabaseError(
                error,
                __filename,
                'PhotoInfo.insertOne',
            );
        }
        // Update user's category count collection

        const categoryDocument = await catCountModel.incrementCategoryByUserId(
            categoryString,
            user._id,
            1,
        );
        // Respond with 404 error if user's category document not found
        if (!categoryDocument) {
            throw await errorHelpers.transformDatabaseError(
                new Error("Unable to locate user's category count document"),
                __filename,
                'insertOne',
            );
        }

        return {
            username: categoryDocument.username,
            category: categoryString,
            categoryUploads: categoryDocument.pictureData[categoryString],
            totalUploads: categoryDocument.totalUploads,
        };
    },

    getAllUsersPhotoInfo: async (username) => {
        try {
            const db = await getDb();

            const results = await db
                .collection(collName)
                .find({ username })
                .toArray();
            return results || [];
        } catch (error) {
            error.statusCode = 500;
            throw error;
        }
    },

    deleteSingleUsersInfo: async (userId) => {
        const userObjId = sanitizeId(userId);

        try {
            const db = await getDb();

            const result = await db.collection(collName).deleteMany({
                userId: userObjId,
            });
            return result.acknowledged;
        } catch (error) {
            error.statusCode = 500;
            throw error;
        }
    },
};

export default photoInfoModel;
