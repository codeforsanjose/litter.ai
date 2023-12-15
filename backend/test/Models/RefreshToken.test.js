/* eslint-disable implicit-arrow-linebreak */
import { Collection, ObjectId } from 'mongodb';
import { faker } from '@faker-js/faker';
import { jest } from '@jest/globals';

import { closeDB, getDb } from '../../DB/db-connection.js';
import refreshTokenModel from '../../models/RefreshToken.js';
import userModel from '../../models/User.js';

const mocks = {
    throwError: {
        findOne: () =>
            jest
                .spyOn(Collection.prototype, 'findOne')
                .mockImplementation(() => {
                    throw new Error('Simulated Error');
                }),
        find: () =>
            jest.spyOn(Collection.prototype, 'find').mockImplementation(() => {
                throw new Error('Simulated Error');
            }),
        insertOne: () =>
            jest
                .spyOn(Collection.prototype, 'insertOne')
                .mockImplementation(() => {
                    throw new Error('Simulated Error');
                }),

        deleteOne: () =>
            jest
                .spyOn(Collection.prototype, 'deleteOne')
                .mockImplementation(() => {
                    throw new Error('Simulated Error');
                }),

        deleteMany: () =>
            jest
                .spyOn(Collection.prototype, 'deleteMany')
                .mockImplementation(() => {
                    throw new Error('Simulated Error');
                }),

        findOneAndUpdate: () =>
            jest
                .spyOn(Collection.prototype, 'findOneAndUpdate')
                .mockImplementation(() => {
                    throw new Error('Simulated Error');
                }),

        aggregate: () =>
            jest
                .spyOn(Collection.prototype, 'aggregate')
                .mockImplementation(() => {
                    throw new Error('Simulated Error');
                }),
    },
};

describe('RefreshToken Model', () => {
    /**
     * @type {import("mongodb").Db}
     */
    let db;
    let newUser;
    const users = [];
    let continueAddingNewUsers = true;
    const collName = {
        catCount: 'categoryCounts',
        users: 'users',
        photoInfo: 'uploadsinfo',
        refresh: 'refreshToken',
    };

    beforeEach(async () => {
        db = await getDb();
        const displayUsername = faker.internet.userName();
        const { insertedId } = await db.collection(collName.users).insertOne({
            username: displayUsername.toLowerCase(),
            displayUsername,
            email: faker.internet.email().toLowerCase(),
            password: faker.internet.password(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            zipCode: faker.location.zipCode(),
            status: 'verified',
            verificationToken: '',
        });
        newUser = await db
            .collection(collName.users)
            .findOne({ _id: insertedId });
        if (continueAddingNewUsers) {
            users.push(newUser);
        }
    });

    afterAll(async () => {
        await closeDB();
    });

    afterEach(async () => {
        jest.restoreAllMocks();
    });

    describe('addToken', () => {
        const sut = refreshTokenModel.addToken;
        it('should create and add a token to the collection', async () => {
            const coll = db.collection(collName.refresh);
            const actualBefore = await coll.countDocuments();
            expect(actualBefore).toBe(0);
            await sut({
                token: 'someToken',
                userId: newUser._id,
                createdAt: new Date(),
                expiresAt: new Date(),
            });
            const actualAfter = await coll.countDocuments();
            expect(actualAfter).toBe(1);
            continueAddingNewUsers = false;
        });

        it('should throw an error if one occurs while querying the database', async () => {
            mocks.throwError.insertOne();
            let didNotThrow = false;
            try {
                await sut({
                    token: 'someToken',
                    userId: newUser._id,
                    createdAt: new Date(),
                    expiresAt: new Date(),
                });
                didNotThrow = true;
            } catch (error) {
                expect(error.message).toContain('Simulated Error');
                expect(error.statusCode).toBe(500);
            }

            if (didNotThrow) {
                throw new Error(
                    'Expected function to throw an Error, but it did not throw',
                );
            }
        });
    });

    describe('updateRevokedToTrue', () => {
        const sut = refreshTokenModel.updateRevokedToTrue;
        let user;
        beforeAll(() => {
            [user] = users;
        });

        it('should find a document by userId and update the revoked property to true', async () => {
            const coll = db.collection(collName.refresh);
            // user = users[0];
            let actual = await coll.findOne({ userId: user._id });
            expect(actual.revoked).toBe(false);
            await sut({ token: actual.token });
            actual = await coll.findOne({ userId: user._id });
            expect(actual.revoked).toBe(true);
        });

        it('should throw an error if one occurs while querying the database', async () => {
            mocks.throwError.findOneAndUpdate();

            let didNotThrow = false;
            try {
                await sut({ token: '' });
                didNotThrow = true;
            } catch (error) {
                expect(error.message).toContain('Simulated Error');
                expect(error.statusCode).toBe(500);
            }

            if (didNotThrow) {
                throw new Error(
                    'Expected function to throw an Error, but it did not throw',
                );
            }
        });
    });
    describe('validateToken', () => {
        const sut = refreshTokenModel.validateToken;
        let user;
        beforeAll(() => {
            [user] = users;
        });
        it('should return an object with a "valid" value of true and a "userData" object if token exists and is not revoked', async () => {
            const token = faker.string.alphanumeric(24);
            await refreshTokenModel.addToken({
                token,
                userId: user._id,
                expiresAt: faker.date.future(),
                createdAt: new Date(),
            });

            const actual = await sut({ token });
            const { valid, userData } = actual;
            expect(valid).toBe(true);

            expect(userData._id).toBeInstanceOf(ObjectId);
            expect(userData._id.toHexString()).toBe(user._id.toHexString());
            expect(userData.email).toBe(user.email);
            expect(userData.username).toBe(user.username);
            expect(userData.zipCode).toBe(user.zipCode);
        });

        it('should return an object with a "valid" value of false and a "userData" object if token exists and is revoked', async () => {
            const token = faker.string.alphanumeric(24);
            await refreshTokenModel.addToken({
                token,
                userId: user._id,
                expiresAt: faker.date.future(),
                createdAt: new Date(),
            });
            await refreshTokenModel.updateRevokedToTrue({ token });

            const actual = await sut({ token });
            const { valid, userData } = actual;
            expect(valid).toBe(false);
            expect(userData).toBeInstanceOf(Object);
        });

        it('should return an object with a "valid" value of false and a "userData" object if token does not exist', async () => {
            const nullDocTknStr = 'bad_token1234567';
            const actual = await sut({ token: nullDocTknStr });
            expect(actual.valid).toBe(false);
        });

        it('should throw an error if one occurs while querying the refreshToken collection', async () => {
            mocks.throwError.findOne();
            const token = faker.string.alphanumeric(24);
            let didNotThrow = false;
            try {
                await sut({ token });
                didNotThrow = true;
            } catch (error) {
                expect(error.message).toContain('Simulated Error');
                expect(error.statusCode).toBe(500);
            }

            if (didNotThrow) {
                throw new Error(
                    'Expected function to throw an Error, but it did not throw',
                );
            }
        });

        it('should throw an error if querying the user collection for the user associated with token', async () => {
            let didNotThrow = false;
            jest.spyOn(userModel, 'findById').mockResolvedValue(null);
            const token = faker.string.alphanumeric(32);
            try {
                await refreshTokenModel.addToken({
                    token,
                    userId: new ObjectId(),
                    createdAt: new Date(),
                    expiresAt: new Date(),
                });
                await sut({ token });
                didNotThrow = true;
            } catch (error) {
                expect(error.message).toContain(
                    'User document could not be located',
                );
                expect(error.statusCode).toBe(500);
            }

            if (didNotThrow) {
                throw new Error(
                    'Expected function to throw an Error, but it did not throw',
                );
            }
        });
    });
});
