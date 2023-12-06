/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { MongoClient, ObjectId, Collection } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { faker } from '@faker-js/faker';
import { jest } from '@jest/globals';

import User from '../../models/User.js';
import PhotoInfo from '../../models/PhotoInfo.js';
import CategoryCount from '../../models/CategoryCount.js';
import { closeDB } from '../../DB/db-connection.js';

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
        findOneAndUpdate: () =>
            jest
                .spyOn(Collection.prototype, 'findOneAndUpdate')
                .mockImplementation(() => {
                    throw new Error('Simulated Error');
                }),
        insertOne: () =>
            jest
                .spyOn(Collection.prototype, 'insertOne')
                .mockImplementation(() => {
                    throw new Error('Simulated Error');
                }),
        updateOne: () =>
            jest
                .spyOn(Collection.prototype, 'updateOne')
                .mockImplementation(() => {
                    throw new Error('Simulated Error');
                }),
        deleteOne: () =>
            jest
                .spyOn(Collection.prototype, 'deleteOne')
                .mockImplementation(() => {
                    throw new Error('Simulated Error');
                }),
    },
    resolveNull: {
        findOne: () =>
            jest.spyOn(Collection.prototype, 'findOne').mockResolvedValue(null),
        findOneAndUpdate: () =>
            jest
                .spyOn(Collection.prototype, 'findOneAndUpdate')
                .mockResolvedValue(null),
    },
    resolvesFalse: {
        insertOne: () =>
            jest.spyOn(Collection.prototype, 'insertOne').mockResolvedValue({
                acknowledged: false,
                insertedId: new ObjectId(),
            }),
    },
};
const dummyUsers = [
    {
        displayUsername: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        zipCode: faker.location.zipCode('#####'),
    },
    {
        displayUsername: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        zipCode: faker.location.zipCode('#####'),
    },
    {
        displayUsername: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        zipCode: faker.location.zipCode('#####'),
    },
    {
        displayUsername: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        zipCode: faker.location.zipCode('#####'),
    },
];

describe('User Model', () => {
    let mongoServer;
    let client;
    let db;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        client = new MongoClient(uri);
        await client.connect();
        db = client.db('testDB');

        PhotoInfo.injectDB(db);
        CategoryCount.injectDB(db);
        User.injectDB(db);
    });

    afterAll(async () => {
        await closeDB();
        await client.close();
        await mongoServer.stop();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('create', () => {
        const sut = User.create;
        const users = [
            {
                displayUsername: faker.internet.userName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                zipCode: faker.location.zipCode('#####'),
            },
            {
                displayUsername: faker.internet.userName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                zipCode: faker.location.zipCode('#####'),
            },
            {
                displayUsername: faker.internet.userName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                zipCode: faker.location.zipCode('#####'),
            },
            {
                displayUsername: faker.internet.userName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                zipCode: faker.location.zipCode('#####'),
            },
        ];

        it.each(users)('should create a new user', async (user) => {
            const actual = await sut(
                user.displayUsername,
                user.email,
                user.password,
                user.firstName,
                user.lastName,
                user.zipCode,
            );

            const expected = {
                username: user.displayUsername.toLowerCase(),
                displayUsername: user.displayUsername,
                email: user.email.toLowerCase(),
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                zipCode: user.zipCode,
            };
            expect(actual).not.toBeNull();
            expect(actual).not.toHaveProperty('password');
            expect(actual).toHaveProperty('_id');
            expect(actual.username).toBe(expected.username);
            expect(actual.displayUsername).toBe(expected.displayUsername);
            expect(actual.email).toBe(expected.email);
            expect(actual.firstName).toBe(expected.firstName);
            expect(actual.lastName).toBe(expected.lastName);
            expect(actual.zipCode).toBe(expected.zipCode);
        });

        it('should throw an error if an argument is missing', async () => {
            let didNotThrow = false;
            try {
                await sut(users[0].displayUsername);
                didNotThrow = true;
            } catch (error) {
                expect(error.message).toContain('Missing input parameter');
                expect(error.statusCode).toBe(400);
            }

            if (didNotThrow) {
                throw new Error(
                    'Expected function to throw an Error, but it did not throw',
                );
            }
        });

        it('should throw an error username is already in use', async () => {
            let didNotThrow = false;
            try {
                await sut(
                    users[0].displayUsername,
                    faker.internet.email(),
                    users[0].password,
                    users[0].firstName,
                    users[0].lastName,
                    users[0].zipCode,
                );
                didNotThrow = true;
            } catch (error) {
                expect(error.message).toContain(
                    'Username or Email already in use',
                );
                expect(error.statusCode).toBe(409);
            }

            if (didNotThrow) {
                throw new Error(
                    'Expected function to throw an Error, but it did not throw',
                );
            }
        });

        it('should throw an error email is already in use', async () => {
            let didNotThrow = false;
            try {
                await sut(
                    faker.internet.userName(),
                    users[0].email,
                    users[0].password,
                    users[0].firstName,
                    users[0].lastName,
                    users[0].zipCode,
                );
                didNotThrow = true;
            } catch (error) {
                expect(error.message).toContain(
                    'Username or Email already in use',
                );
                expect(error.statusCode).toBe(409);
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
                await sut(
                    faker.internet.userName(),
                    faker.internet.email(),
                    users[0].password,
                    users[0].firstName,
                    users[0].lastName,
                    users[0].zipCode,
                );
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
    describe('find methods', () => {
        let createdUsers;
        beforeAll(async () => {
            const createdUserPassword = faker.internet.password();
            createdUsers = await Promise.all(
                dummyUsers.map(async (dummyUser) => {
                    const createdUser = await User.create(
                        dummyUser.displayUsername,
                        dummyUser.email,
                        createdUserPassword,
                        dummyUser.firstName,
                        dummyUser.lastName,
                        dummyUser.zipCode,
                    );
                    const createdUserWithPassword = {
                        ...createdUser,
                        password: createdUserPassword,
                        _id: new ObjectId(createdUser._id),
                    };
                    return createdUserWithPassword;
                }),
            );
        });
        describe('findByEmail', () => {
            const sut = User.findByEmail;
            it('should find a user by email', async () => {
                for (const user of createdUsers) {
                    const actual = await sut(user.email);
                    expect(actual).not.toBeNull();
                    expect(actual).toEqual(user);
                }
            });

            it('should return null for a non-existing email', async () => {
                const user = await sut('nonexistent@example.com');
                expect(user).toBeNull();
            });

            it('should throw an error if one occurs while querying the database', async () => {
                mocks.throwError.findOne();
                let didNotThrow = false;
                try {
                    await sut(createdUsers[0].email);
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

        describe('findById', () => {
            const sut = User.findById;
            it('should find a user by id as an ObjectId', async () => {
                for (const user of createdUsers) {
                    const actual = await sut(user._id);
                    expect(actual).not.toBeNull();
                    expect(actual).toEqual(user);
                }
            });

            it('should find a user by id as a string', async () => {
                for (const user of createdUsers) {
                    const actual = await sut(user._id.toHexString());
                    expect(actual).not.toBeNull();
                    expect(actual).toEqual(user);
                }
            });

            it('should return null for a non-existing id', async () => {
                const user = await sut(22);
                expect(user).toBeNull();
            });

            it('should throw an error if one occurs while querying the database', async () => {
                mocks.throwError.findOne();
                let didNotThrow = false;
                try {
                    await sut(createdUsers[0]._id);
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
            const sut = User.findByUsername;
            it('should find a user by username', async () => {
                for (const user of createdUsers) {
                    const actual = await sut(user.username);
                    expect(actual).not.toBeNull();
                    expect(actual).toEqual(user);
                }
            });

            it('should find a user by displayUsername', async () => {
                for (const user of createdUsers) {
                    const actual = await sut(user.displayUsername);
                    expect(actual).not.toBeNull();
                    expect(actual).toEqual(user);
                }
            });

            it('should find a user by username when username needs to be trimmed', async () => {
                for (const user of createdUsers) {
                    const actual = await sut(`    ${user.displayUsername}   `);
                    expect(actual).not.toBeNull();
                    expect(actual).toEqual(user);
                }
            });

            it('should return null for non-existing username', async () => {
                const user = await sut('fake');
                expect(user).toBeNull();
            });

            it('should throw an error if one occurs while querying the database', async () => {
                mocks.throwError.findOne();
                let didNotThrow = false;
                try {
                    await sut(createdUsers[0].username);
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
    describe('delete', () => {
        const sut = User.delete;
        const { getAllUsersPhotoInfo } = PhotoInfo;
        const findUserByEmail = User.findByEmail;
        const findUserCategoryDocument = CategoryCount.findByUserId;
        let userForDeleteTest;
        beforeAll(async () => {
            const userForDeletePassword = faker.internet.password();
            userForDeleteTest = await User.create(
                faker.internet.userName(),
                faker.internet.email(),
                userForDeletePassword,
                faker.person.firstName(),
                faker.person.lastName(),
                faker.location.zipCode('#####'),
            );

            userForDeleteTest = {
                ...userForDeleteTest,
                password: userForDeletePassword,
            };

            await Promise.all([
                PhotoInfo.insertOne('trash', {
                    _id: userForDeleteTest._id,
                    username: userForDeleteTest.username,
                }),
                PhotoInfo.insertOne('plastic', {
                    _id: userForDeleteTest._id,
                    username: userForDeleteTest.username,
                }),
            ]);
        });

        it("should delete the selected user's data from all collections", async () => {
            let actual = await findUserByEmail(userForDeleteTest.email);
            let actualUserPhotos = await getAllUsersPhotoInfo(actual._id);
            expect({ ...actual, _id: actual._id.toHexString() }).toEqual(
                userForDeleteTest,
            );
            expect(actualUserPhotos).toHaveLength(2);
            actual = await sut(actual._id);
            actualUserPhotos = await PhotoInfo.getAllUsersPhotoInfo(
                userForDeleteTest._id,
            );

            const actualUserCategoryCountDocument =
                await findUserCategoryDocument(userForDeleteTest._id);
            expect(actual).toBe(true);
            expect(actualUserPhotos).toHaveLength(0);
            expect(actualUserCategoryCountDocument).toBeNull();
        });

        it('should return false if there is no matching user', async () => {
            const actual = await sut(userForDeleteTest._id);
            expect(actual).toBeFalsy();
        });

        it('should throw an error if one occurs while querying the database', async () => {
            mocks.throwError.deleteOne();
            let didNotThrow = false;
            try {
                await sut(new ObjectId());
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
