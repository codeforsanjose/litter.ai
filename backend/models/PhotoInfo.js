import { fileURLToPath } from 'url';
import { ObjectId } from 'mongodb';
import { getUploadInfoCollection } from '../DB/collections.js';
import CategoryCount from './CategoryCount.js';
import errorHelpers from './helpers/errorHelpers.js';

const __filename = fileURLToPath(import.meta.url);

/**
 * @type {import('mongodb').Collection}
 */
let photoInfoCollection = getUploadInfoCollection;

const PhotoInfo = {
    injectDB: (db) => {
        if (process.env.NODE_ENV === 'test') {
            photoInfoCollection = db.collection('uploadsinfo');
        }
    },

    /**
     * @typedef {Object} User
     * @property {string} username
     * @property {string} email
     * @property {string} _id
     */

    /**
     * @param {string} category
     * @param {User} user
     */
    insertOne: async (categoryString, user) => {
        if (typeof user._id === 'string') {
            // eslint-disable-next-line no-param-reassign
            user._id = new ObjectId(user._id);
        }
        try {
            // Insert new photoInfo document
            await photoInfoCollection.insertOne({
                userId: user._id,
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

        const categoryDocument = await CategoryCount.incrementCategoryByUserId(
            categoryString,
            user._id,
            1,
        );
        // Respond with 404 error if user's category document not found
        if (!categoryDocument) {
            const error = new Error(
                "Unable to locate user's category count document",
            );
            error.statusCode = 404;
            throw error;
        }

        return {
            username: categoryDocument.username,
            category: categoryString,
            categoryUploads: categoryDocument.pictureData[categoryString],
            totalUploads: categoryDocument.totalUploads,
        };
    },

    getAllUsersPhotoInfo: async (userId) => {
        let userObjectId;
        try {
            if (typeof userId === 'string') {
                userObjectId = new ObjectId(userId);
            }

            const results = await photoInfoCollection
                .find({ userId: userObjectId || userId })
                .toArray();
            return results || [];
        } catch (error) {
            error.statusCode = 500;
            throw error;
        }
    },

    deleteSingleUsersInfo: async (userId) => {
        let userObjectId;
        if (typeof userId === 'string') {
            userObjectId = new ObjectId(userId);
        }
        try {
            const result = await photoInfoCollection.deleteMany({
                userId: userObjectId || userId,
            });
            return result.acknowledged;
        } catch (error) {
            error.statusCode = 500;
            throw error;
        }
    },
};

export default PhotoInfo;
