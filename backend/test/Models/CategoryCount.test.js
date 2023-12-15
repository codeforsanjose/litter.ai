/* eslint-disable implicit-arrow-linebreak */
import { Collection, ObjectId } from 'mongodb';
import { faker } from '@faker-js/faker';
import { jest } from '@jest/globals';

import catCountModel from '../../models/CategoryCount.js';
import { closeDB, getDb } from '../../DB/db-connection.js';

const categories = [
    'paper',
    'cardboard',
    'compost',
    'metal',
    'glass',
    'plastic',
    'trash',
    'other',
    'unknown',
];
const getRandomCategory = () => {
    const randomNumber = Math.floor(Math.random() * categories.length);
    return categories[randomNumber];
};

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

describe('catCountModel', () => {
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
    };

    // beforeAll(async () => {
    //     db = await getDb();
    //     newUser = await userModel.create(
    //         faker.internet.userName(),
    //         faker.internet.email(),
    //         faker.internet.password(),
    //         faker.person.firstName(),
    //         faker.person.lastName(),
    //         faker.location.zipCode('#####'),
    //     );
    // });

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

    describe('create', () => {
        const sut = catCountModel.create;
        it('should create a category document', async () => {
            const coll = db.collection(collName.catCount);
            const actualBefore = await coll.countDocuments();
            await sut(
                newUser._id,
                newUser.username,
                newUser.displayUsername,
                newUser.email,
            );
            const actual = await coll.countDocuments();

            expect(actualBefore).toBe(0);
            expect(actual).toBe(1);
        });

        it('should return an object with the correct properties and values', async () => {
            const coll = db.collection(collName.catCount);
            const { insertedId } = await sut(
                newUser._id,
                newUser.username,
                newUser.displayUsername,
                newUser.email,
            );
            const actual = await coll.findOne({ _id: insertedId });

            expect(actual).not.toBeNull();
            expect(actual._id).toBeInstanceOf(ObjectId);
            expect(actual.userId).toBeInstanceOf(ObjectId);
            expect(actual).toHaveProperty('email', newUser.email);
            expect(actual).toHaveProperty('username', newUser.username);
            expect(actual).toHaveProperty(
                'displayUsername',
                newUser.displayUsername,
            );
            expect(actual).toHaveProperty('pictureData');
            categories.forEach((category) => {
                expect(actual.pictureData).toHaveProperty(category, 0);
            });
            expect(actual).toHaveProperty('totalUploads', 0);
            continueAddingNewUsers = false;
        });

        it('should throw an error if one occurs while querying the database', async () => {
            mocks.throwError.insertOne();
            let didNotThrow = false;
            try {
                await sut(
                    newUser._id,
                    newUser.username,
                    newUser.displayUsername,
                    newUser.email,
                );
                didNotThrow = true;
            } catch (error) {
                expect(error.message).toContain('Simulated Error');
                expect(error.statusCode).toBe(500);
                continueAddingNewUsers = true;
            }

            if (didNotThrow) {
                throw new Error(
                    'Expected function to throw an Error, but it did not throw',
                );
            }
            continueAddingNewUsers = true;
        });
    });

    describe('incrementCategoryByUserId', () => {
        const sut = catCountModel.incrementCategoryByUserId;
        // beforeAll(async () => {});

        beforeEach(async () => {
            if (continueAddingNewUsers) {
                await catCountModel.create(
                    newUser._id,
                    newUser.username,
                    newUser.displayUsername,
                    newUser.email,
                );
            }
        });

        it('should return a document with the expected properties', async () => {
            const actual = await sut(getRandomCategory(), newUser._id, 0);
            expect(actual).not.toBeNull();
            expect(actual._id).toBeInstanceOf(ObjectId);
            expect(actual.userId).toBeInstanceOf(ObjectId);
            expect(actual).toHaveProperty('email', newUser.email);
            expect(actual).toHaveProperty('username', newUser.username);
            expect(actual).toHaveProperty(
                'displayUsername',
                newUser.displayUsername,
            );
            expect(actual).toHaveProperty('pictureData');
            categories.forEach((category) => {
                expect(actual.pictureData).toHaveProperty(category, 0);
            });
            expect(actual).toHaveProperty('totalUploads', 0);
        });

        it('should increment the correct category and totalUploads by a given value', async () => {
            db = await getDb();
            await Promise.all(
                users.map(async (user, i) => {
                    const category = getRandomCategory();
                    const incVal = i + 1;
                    await sut(category, user._id, incVal);
                    const actual = await catCountModel.findByUserId(user._id);
                    expect(actual.totalUploads).toBe(incVal);
                    expect(actual.pictureData[category]).toBe(incVal);
                }),
            );
            continueAddingNewUsers = false;
        });

        it('should throw an error if userId is invalid ObjectId', async () => {
            mocks.throwError.findOneAndUpdate();
            let didNotThrow = false;
            try {
                await sut(getRandomCategory(), 'abcdef', 0);
                didNotThrow = true;
            } catch (error) {
                expect(error.message).toContain('input must be a 24 character');
            }

            if (didNotThrow) {
                throw new Error(
                    'Expected function to throw an Error, but it did not throw',
                );
            }
        });

        it('should throw an error if one occurs while findOneAndUpdate the collection', async () => {
            mocks.throwError.findOneAndUpdate();
            let didNotThrow = false;
            try {
                await sut(getRandomCategory(), newUser._id, 0);
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

    describe('getLeaderboardByCategory', () => {
        const sut = catCountModel.getLeaderboardByCategory;

        beforeAll(async () => {
            Promise.all(
                users.flatMap((user) => {
                    const tasks = [];
                    for (let i = 0; i < 100; i += 1) {
                        tasks.push(
                            catCountModel.incrementCategoryByUserId(
                                getRandomCategory(),
                                user._id,
                                1,
                            ),
                        );
                    }
                    return tasks;
                }),
            ).catch((error) => {
                console.error('An error occurred:', error);
            });
        });

        it('should return a leaderboard with the correct information if a user is logged in with no submissions', async () => {
            const category = getRandomCategory();
            const usernames = users.map((user) => user.displayUsername);
            const actual = await sut({
                category,
                userId: newUser._id,
                page: 1,
                perPage: 10,
            });
            expect(actual.category).toBe(category);
            expect(actual.totalEntries).toBe(users.length);
            expect(actual.username).toBe(newUser.displayUsername);
            expect(actual.userRank).toBe(-1);
            expect(actual.userItemCount).toBe(0);
            expect(actual.leaderboard).toHaveLength(users.length);
            actual.leaderboard.forEach((entry, i) => {
                expect(usernames).toContain(entry.username);
                expect(entry.rank).toBe(i + 1);
                expect(entry.itemCount).toBeGreaterThan(0);
            });
        });

        it('should return a leaderboard with the correct information if a user is logged in with submissions', async () => {
            const category = getRandomCategory();
            const userData = users[0];
            const usernames = users.map((user) => user.displayUsername);
            const actual = await sut({
                category,
                userId: userData._id,
                page: 1,
                perPage: 10,
            });
            expect(actual.category).toBe(category);
            expect(actual.totalEntries).toBe(users.length);
            expect(actual.username).toBe(userData.displayUsername);
            expect(actual.userRank).not.toBe(-1);
            expect(actual.userRank).toBeGreaterThan(0);
            expect(actual.userItemCount).toBeGreaterThan(0);
            expect(actual.leaderboard).toHaveLength(users.length);
            actual.leaderboard.forEach((entry, i) => {
                expect(usernames).toContain(entry.username);
                expect(entry.rank).toBe(i + 1);
                expect(entry.itemCount).toBeGreaterThan(0);
            });
        });

        it('should return a leaderboard with the correct information if a user is logged in with submissions', async () => {
            const category = getRandomCategory();
            const usernames = users.map((user) => user.displayUsername);
            const actual = await sut({
                category,
                page: 1,
                perPage: 10,
            });
            expect(actual.category).toBe(category);
            expect(actual.totalEntries).toBe(users.length);
            expect(actual.username).toBeNull();
            expect(actual.userRank).toBeNull();
            expect(actual.userRank).toBeNull();
            expect(actual.userItemCount).toBeNull();
            expect(actual.leaderboard).toHaveLength(users.length);
            actual.leaderboard.forEach((entry, i) => {
                expect(usernames).toContain(entry.username);
                expect(entry.rank).toBe(i + 1);
                expect(entry.itemCount).toBeGreaterThan(0);
            });
        });

        it('should throw an error if one occurs while aggregate the collection', async () => {
            mocks.throwError.aggregate();
            const category = getRandomCategory();
            let didNotThrow = false;
            try {
                await sut({ page: 1, perPage: 10, category });
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

    describe('getLeaderboardByTotal', () => {
        const sut = catCountModel.getLeaderboardByTotal;

        it('should return a leaderboard with the correct information if a user is logged in with no submissions', async () => {
            const usernames = users.map((user) => user.displayUsername);
            const actual = await sut({
                userId: newUser._id,
                page: 1,
                perPage: 10,
            });
            expect(actual.totalEntries).toBe(users.length);
            expect(actual.username).toBe(newUser.displayUsername);
            expect(actual.userRank).toBe(-1);
            expect(actual.userItemCount).toBe(0);
            expect(actual.leaderboard).toHaveLength(users.length);
            actual.leaderboard.forEach((entry, i) => {
                expect(usernames).toContain(entry.username);
                expect(entry.rank).toBe(i + 1);
                expect(entry.itemCount).toBeGreaterThan(0);
            });
        });

        it('should return a leaderboard with the correct information if a user is logged in with submissions', async () => {
            const userData = users[0];
            const usernames = users.map((user) => user.displayUsername);
            const actual = await sut({
                userId: userData._id,
                page: 1,
                perPage: 10,
            });
            expect(actual.totalEntries).toBe(users.length);
            expect(actual.username).toBe(userData.displayUsername);
            expect(actual.userRank).not.toBe(-1);
            expect(actual.userRank).toBeGreaterThan(0);
            expect(actual.userItemCount).toBeGreaterThan(0);
            expect(actual.leaderboard).toHaveLength(users.length);
            actual.leaderboard.forEach((entry, i) => {
                expect(usernames).toContain(entry.username);
                expect(entry.rank).toBe(i + 1);
                expect(entry.itemCount).toBeGreaterThan(0);
            });
        });

        it('should return a leaderboard with the correct information if a user is logged in with submissions', async () => {
            const usernames = users.map((user) => user.displayUsername);
            const actual = await sut({
                page: 1,
                perPage: 10,
            });
            expect(actual.totalEntries).toBe(users.length);
            expect(actual.username).toBeNull();
            expect(actual.userRank).toBeNull();
            expect(actual.userRank).toBeNull();
            expect(actual.userItemCount).toBeNull();
            expect(actual.leaderboard).toHaveLength(users.length);
            actual.leaderboard.forEach((entry, i) => {
                expect(usernames).toContain(entry.username);
                expect(entry.rank).toBe(i + 1);
                expect(entry.itemCount).toBeGreaterThan(0);
            });
        });

        it('should throw an error if one occurs while aggregate the collection', async () => {
            mocks.throwError.aggregate();
            let didNotThrow = false;
            try {
                await sut({ page: 1, perPage: 10 });
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

    describe('findByUserId', () => {
        const sut = catCountModel.findByUserId;

        it('should find and return an object with the correct properties', async () => {
            const user = users[0];
            const actual = await sut(user._id);

            expect(actual).not.toBeNull();
            expect(actual._id).toBeInstanceOf(ObjectId);
            expect(actual.userId).toBeInstanceOf(ObjectId);
            expect(actual).toHaveProperty('username', user.username);
            expect(actual).toHaveProperty(
                'displayUsername',
                user.displayUsername,
            );
            expect(actual).toHaveProperty('pictureData');
            categories.forEach((category) => {
                expect(actual.pictureData).toHaveProperty(category);
            });
            expect(actual).toHaveProperty('totalUploads');
        });

        it('should return null if cannot find document by id', async () => {
            const actual = await sut(22);

            expect(actual).toBeNull();
        });

        it('should throw an error if one occurs while findOne the collection', async () => {
            mocks.throwError.findOne();
            let didNotThrow = false;
            try {
                await sut(22);
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

    describe('findByUsername', () => {
        const sut = catCountModel.findByUsername;

        it('should find and return an object with the correct properties', async () => {
            const user = users[0];
            const actual = await sut(user.username);

            expect(actual).not.toBeNull();
            expect(actual._id).toBeInstanceOf(ObjectId);
            expect(actual.userId).toBeInstanceOf(ObjectId);
            expect(actual).toHaveProperty('username', user.username);
            expect(actual).toHaveProperty(
                'displayUsername',
                user.displayUsername,
            );
            expect(actual).toHaveProperty('pictureData');
            categories.forEach((category) => {
                expect(actual.pictureData).toHaveProperty(category);
            });
            expect(actual).toHaveProperty('totalUploads');
        });

        it('should return null if cannot find document by id', async () => {
            const actual = await sut('badUserName');
            expect(actual).toBeNull();
        });

        it('should throw an error if one occurs while findOne the collection', async () => {
            mocks.throwError.findOne();
            let didNotThrow = false;
            try {
                await sut('badUserName');
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

    describe('deleteUserInfo', () => {
        const sut = catCountModel.deleteUserInfo;

        it("should delete a user's document successfully", async () => {
            const user = users[0];
            let userDoc = await catCountModel.findByUserId(user._id);
            expect(userDoc).not.toBeNull();
            const actual = await sut(user._id);
            expect(actual).toBe(true);
            userDoc = await catCountModel.findByUserId(user._id);
            expect(userDoc).toBeNull();
        });

        it('should throw an error if one occurs while deleteOne the collection', async () => {
            mocks.throwError.deleteOne();
            const user = users[0];
            let didNotThrow = false;
            try {
                await sut(user._id);
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
});
