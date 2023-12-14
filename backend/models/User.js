import { fileURLToPath } from 'url';
import { ObjectId } from 'mongodb';

import { getUserCollection } from '../DB/collections.js';
import categoryCount from './CategoryCount.js';
import errorHelpers from './helpers/errorHelpers.js';
import photoInfo from './PhotoInfo.js';

const __filename = fileURLToPath(import.meta.url);

/**
 * @type {import('mongodb').Collection}
 */

let usersCollection = getUserCollection;

const userModel = {
    injectDB: (db) => {
        if (process.env.NODE_ENV === 'test') {
            usersCollection = db.collection('users');
        }
    },

    findByEmail: async (email) => {
        const sanitizedEmail = email.toLowerCase().trim();
        try {
            return await usersCollection.findOne({ email: sanitizedEmail });
        } catch (error) {
            throw await errorHelpers.transformDatabaseError(
                error,
                __filename,
                'User.findByEmail',
            );
        }
    },

    findById: async (_id) => {
        let userId = _id;
        try {
            if (typeof _id === 'string') {
                userId = new ObjectId(_id);
            }
            return await usersCollection.findOne({ _id: userId });
        } catch (error) {
            throw await errorHelpers.transformDatabaseError(
                error,
                __filename,
                'User.findById',
            );
        }
    },

    findByUsername: async (username) => {
        try {
            return await usersCollection.findOne({
                username: username.toLowerCase().trim(),
            });
        } catch (error) {
            throw await errorHelpers.transformDatabaseError(
                error,
                __filename,
                'User.findByUsername',
            );
        }
    },

    create: async (
        displayUsername,
        email,
        hashedPassword,
        firstName,
        lastName,
        zipCode,
    ) => {
        if (
            !displayUsername ||
            !email ||
            !hashedPassword ||
            !firstName ||
            !lastName ||
            !zipCode
        ) {
            const error = new Error('Missing input parameter');
            error.statusCode = 400;
            throw error;
        }

        // Sanitize data
        const trimmedFirstName = firstName.trim();
        const trimmedLastName = lastName.trim();
        const lowerCaseUsername = displayUsername.toLowerCase().trim();
        const trimmedDisplayname = displayUsername.trim();
        const trimmedEmail = email.toLowerCase().trim();
        const trimmedZipCode = zipCode.trim();
        // Create payload
        const payload = {
            username: lowerCaseUsername,
            displayUsername: trimmedDisplayname,
            email: trimmedEmail,
            password: hashedPassword,
            firstName: `${trimmedFirstName[0].toUpperCase()}${trimmedFirstName.substring(
                1,
            )}`,
            lastName: `${trimmedLastName[0].toUpperCase()}${trimmedLastName.substring(
                1,
            )}`,
            zipCode: trimmedZipCode,
            status: 'pending',
        };

        try {
            const userDoc = await usersCollection.insertOne(payload);
            // Create a category count document within CategoryCount Collection
            await categoryCount.create(
                userDoc.insertedId,
                lowerCaseUsername,
                trimmedDisplayname,
                trimmedEmail,
            );

            return {
                _id: userDoc.insertedId.toHexString(),
                username: payload.username,
                displayUsername: payload.displayUsername,
                email: payload.email,
                firstName: payload.firstName,
                lastName: payload.lastName,
                zipCode: payload.zipCode,
            };
        } catch (error) {
            throw await errorHelpers.transformDatabaseError(
                error,
                __filename,
                'User.create',
            );
        }
    },

    delete: async (_id) => {
        let idObject;
        if (typeof _id === 'string') {
            idObject = new ObjectId(_id);
        }
        try {
            const user = await usersCollection.deleteOne({
                _id: idObject || _id,
            });

            if (user.deletedCount === 0) {
                return false;
            }

            await photoInfo.deleteSingleUsersInfo(_id);
            await categoryCount.deleteUserInfo(_id);
            return user.acknowledged;
        } catch (error) {
            throw await errorHelpers.transformDatabaseError(
                error,
                __filename,
                'User.delete',
            );
        }
    },
};

export default userModel;
