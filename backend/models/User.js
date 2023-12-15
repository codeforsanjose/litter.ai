// @ts-nocheck
import { fileURLToPath } from 'url';

import catCountModel from './CategoryCount.js';
import errorHelpers from './helpers/errorHelpers.js';
import photoInfo from './PhotoInfo.js';
import { getDb } from '../DB/db-connection.js';
import sanitizeId from './helpers/sanitizeId.js';

const __filename = fileURLToPath(import.meta.url);

const collName = 'users';
const userModel = {
    findByEmail: async (email) => {
        const sanitizedEmail = email.toLowerCase().trim();
        try {
            const db = await getDb();
            return await db
                .collection(collName)
                .findOne({ email: sanitizedEmail });
        } catch (error) {
            throw await errorHelpers.transformDatabaseError(
                error,
                __filename,
                'User.findByEmail',
            );
        }
    },

    findById: async (_id) => {
        const userId = sanitizeId(_id);
        try {
            const db = await getDb();
            return await db.collection(collName).findOne({ _id: userId });
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
            const db = await getDb();
            return await db.collection(collName).findOne({
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
            verificationToken: '',
        };

        try {
            const db = await getDb();
            const userDoc = await db.collection(collName).insertOne(payload);
            // Create a category count document within CategoryCount Collection
            await catCountModel.create(
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
        const userId = sanitizeId(_id);
        try {
            const db = await getDb();
            const user = await db.collection(collName).deleteOne({
                _id: userId,
            });

            if (user.deletedCount === 0) {
                return false;
            }

            await photoInfo.deleteSingleUsersInfo(userId);
            await catCountModel.deleteUserInfo(userId);
            return user.acknowledged;
        } catch (error) {
            throw await errorHelpers.transformDatabaseError(
                error,
                __filename,
                'User.delete',
            );
        }
    },

    updateStatus: async ({ _id, status }) => {
        const userId = sanitizeId(_id);
        try {
            const db = await getDb();
            await db
                .collection(collName)
                .findOneAndUpdate({ _id: userId }, { $set: { status } });
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
