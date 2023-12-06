/* eslint-disable no-underscore-dangle */

import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONOGO_URI || 'mongodb://localhost:27017';
const dbName = 'litterai-api';

let _db;
let _client;

export const mongoConnect = async () => {
    try {
        _client = await MongoClient.connect(MONGO_URI);
        _db = _client.db(dbName);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getDb = async () => {
    if (_db) {
        return _db;
    }
    try {
        await mongoConnect();
        return _db;
    } catch (error) {
        console.log(error);
        throw new Error('Error connecting to the database');
    }
};

export const closeDB = async () => {
    if (_client) {
        try {
            await _client.close();
        } catch (error) {
            console.error('Error closing the database connection:', error);
        }
    }
};
