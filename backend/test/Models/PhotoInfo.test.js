/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-plusplus */
import { Collection } from 'mongodb';
import { faker } from '@faker-js/faker';
import { jest } from '@jest/globals';

import photoInfoModel from '../../models/PhotoInfo.js';
import catCountModel from '../../models/CategoryCount.js';
import userModel from '../../models/User.js';
import { closeDB } from '../../DB/db-connection.js';

const getRandomCategory = () => {
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
    null: {
        findOneAndUpdate: () =>
            jest
                .spyOn(Collection.prototype, 'findOneAndUpdate')
                .mockResolvedValue(false),
    },
};

describe('PhotoInfo Model', () => {
    let newUser;

    beforeAll(async () => {
        newUser = await userModel.create(
            faker.internet.userName(),
            faker.internet.email(),
            faker.internet.password(),
            faker.person.firstName(),
            faker.person.lastName(),
            faker.location.zipCode('#####'),
        );
    });

    afterAll(async () => {
        await closeDB();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('insertOne', () => {
        const sut = photoInfoModel.insertOne;
        const category = getRandomCategory();
        let newPhotoCategoryCount = 0;

        it('should not return null', async () => {
            const actual = await sut(category, {
                _id: newUser._id,
                username: newUser.username,
            });
            newPhotoCategoryCount++;
            expect(actual).not.toBeNull();
        });

        it('should return the same category that was inserted', async () => {
            const actual = await sut(category, {
                _id: newUser._id,
                username: newUser.username,
            });
            newPhotoCategoryCount++;
            expect(actual.category).toEqual(category);
        });

        it("should have a categoryUpload value that is equal to the CategoryCount document's value", async () => {
            const actual = await catCountModel.findByUserId(newUser._id);
            const expected = newPhotoCategoryCount;
            expect(actual.pictureData[category]).toEqual(expected);
        });

        it("should have a totalUploads value that is equal to the CategoryCount document's value", async () => {
            const actual = await catCountModel.findByUserId(newUser._id);
            const expected = newPhotoCategoryCount;
            expect(actual.totalUploads).toEqual(expected);
        });

        it('should throw an error if an invalid userId is entered', async () => {
            mocks.null.findOneAndUpdate();
            let didNotThrow = false;

            try {
                await sut(category, {
                    _id: newUser._id,
                    username: newUser.userName,
                });
                didNotThrow = true;
            } catch (error) {
                expect(error.message).toContain(
                    "Unable to locate user's category count document",
                );
                expect(error.statusCode).toBe(500);
            }

            if (didNotThrow) {
                throw new Error(
                    'Expected function to throw an Error, but it did not throw',
                );
            }
        });

        it('should throw an error if one occurs while querying the database', async () => {
            mocks.throwError.insertOne();
            let didNotThrow = false;
            try {
                await sut(category, {
                    _id: newUser._id,
                    username: newUser.userName,
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

    describe('getAllUsersPhotoInfo', () => {
        const sut = photoInfoModel.getAllUsersPhotoInfo;
        const newUserPhotoArrayLength = 2;

        it('should return an array', async () => {
            let actual = await sut(newUser.username);
            expect(actual).toBeInstanceOf(Array);
            actual = await photoInfoModel.getAllUsersPhotoInfo(22);
            expect(actual).toBeInstanceOf(Array);
        });

        it('should return the correct length', async () => {
            const actual = await sut(newUser.username);
            expect(actual).toHaveLength(newUserPhotoArrayLength);
        });

        it('should be contain the correct object', async () => {
            const actual = await sut(newUser._id);
            actual.forEach((photoData) => {
                expect(photoData).toHaveProperty('_id');
                expect(photoData).toHaveProperty('userId');
                expect(photoData).toHaveProperty('category');
                expect(photoData).toHaveProperty('createdAt');
            });
        });

        it('should throw an error if one occurs while querying the database', async () => {
            mocks.throwError.find();
            let didNotThrow = false;
            try {
                await sut(newUser._id);
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

    describe('deleteSingleUsersInfo', () => {
        const sut = photoInfoModel.deleteSingleUsersInfo;
        it('should delete all documents in collection for provided userId', async () => {
            const actualBeforeDelete =
                await photoInfoModel.getAllUsersPhotoInfo(newUser.username);
            expect(actualBeforeDelete.length).toBeGreaterThan(0);
            // Delete documents
            await sut(newUser._id);
            const actualAfterDelete = await photoInfoModel.getAllUsersPhotoInfo(
                newUser._id,
            );
            expect(actualAfterDelete).toHaveLength(0);
        });
        it('should throw an error if one occurs while querying the database', async () => {
            mocks.throwError.deleteMany();
            let didNotThrow = false;
            try {
                await sut(newUser._id);
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
