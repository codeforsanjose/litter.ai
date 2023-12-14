/* eslint-disable no-underscore-dangle */

import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = 'litterai-api';

let _db;
let _client;
let _mongoServer;

export const dbObjects = { _db, _client, _mongoServer };

export const mongoConnect = async () => {
    if (process.env.NODE_ENV === 'test') {
        _mongoServer = await MongoMemoryServer.create();
        const uri = _mongoServer.getUri();
        console.log(uri);
        _client = new MongoClient(uri);
        _db = _client.db('testDB');
    } else {
        try {
            _client = await MongoClient.connect(MONGO_URI);
            _db = _client.db(dbName);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};

export const getDb = async () => {
    if (_db && _client) {
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
            if (process.env.NODE_ENV === 'test') {
                await _mongoServer.stop();
            }
        } catch (error) {
            console.error('Error closing the database connection:', error);
        }
    }
};
