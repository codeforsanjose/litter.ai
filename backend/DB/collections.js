/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */

import { fileURLToPath } from 'url';
import { getDb } from './db-connection.js';
import logError from '../Errors/log-error.js';

const __filename = fileURLToPath(import.meta.url);

let userCollection;
let uploadCollection;
let categoryCountCollection;
let blacklistCollection;

const getCollection = async (collectionName, collection) => {
    if (collection) {
        return collection;
    }
    try {
        const db = await getDb();
        collection = await db.collection(collectionName);
        return collection;
    } catch (error) {
        logError(
            error,
            __filename,
            'getCollection',
            `Failed connecting to ${collectionName}`,
        );
        console.log(error);
    }
};

export const getUserCollection = await getCollection('users', userCollection);
export const getUploadInfoCollection = await getCollection(
    'uploadsinfo',
    uploadCollection,
);
export const getCatCountCollection = await getCollection(
    'categoryCounts',
    categoryCountCollection,
);
export const getBlacklistCollection = await getCollection(
    'blacklistTokens',
    blacklistCollection,
);
