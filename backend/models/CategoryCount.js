import { fileURLToPath } from 'url';
import { ObjectId } from 'mongodb';
import { getCatCountCollection, getUserCollection } from '../DB/collections.js';
import errorHelpers from './helpers/errorHelpers.js';

const __filename = fileURLToPath(import.meta.url);
/**
 * @type {import('mongodb').Collection}
 */
let catCountCollection =
    process.env.NODE_ENV !== 'test' && getCatCountCollection;

let userCollection = process.env.NODE_ENV !== 'test' && getUserCollection;

const categoryCount = {
    injectDB: (db) => {
        if (process.env.NODE_ENV === 'test') {
            catCountCollection = db.collection('categoryCounts');
            userCollection = db.collection('users');
        }
    },

    create: async (userId, username, displayUsername, email) => {
        if (typeof userId === 'string') {
            // eslint-disable-next-line no-param-reassign
            userId = new ObjectId(userId);
        }
        try {
            const payload = {
                userId,
                email,
                username,
                displayUsername,
                pictureData: {
                    paper: 0,
                    cardboard: 0,
                    compost: 0,
                    metal: 0,
                    glass: 0,
                    plastic: 0,
                    trash: 0,
                    other: 0,
                    unknown: 0,
                },
                totalUploads: 0,
            };
            const result = await catCountCollection.insertOne(payload);

            return result;
        } catch (error) {
            throw await errorHelpers.transformDatabaseError(
                error,
                __filename,
                'CategoryCount.create',
            );
        }
    },

    getLeaderboardByCategory: async ({
        category,
        page,
        perPage,
        userId = null,
    }) => {
        let includeLoggedInUserPipeline = false;
        if (userId) {
            includeLoggedInUserPipeline = true;
        }

        let userObjectId;
        if (typeof userId === 'string') {
            userObjectId = new ObjectId(userId);
        }

        const startIndex = (page - 1) * perPage;
        const sharedPipelineStages = [
            { $match: { [`pictureData.${category}`]: { $gt: 0 } } },
            {
                $project: {
                    itemCount: `$pictureData.${category}`,
                    username: '$displayUsername',
                    userId: 1,
                },
            },
            { $sort: { itemCount: -1 } },
            {
                $group: {
                    _id: null,
                    data: {
                        $push: '$$ROOT',
                    },
                },
            },
            {
                $unwind: {
                    path: '$data',
                    includeArrayIndex: 'data.rank',
                },
            },
            { $replaceRoot: { newRoot: '$data' } },
        ];

        const pipeline = [
            {
                $facet: {
                    // Branch for full leaderboard
                    leaderboard: [
                        ...sharedPipelineStages,
                        {
                            $project: {
                                _id: 0,
                                username: 1,
                                itemCount: 1,
                                rank: { $add: ['$rank', 1] },
                            },
                        },
                    ],
                    // Conditional inclusion of loggedInUser
                    // prettier-ignore
                    ...(includeLoggedInUserPipeline ? {
                        loggedInUser: [
                            ...sharedPipelineStages,
                            { $match: { userId: userObjectId } },
                            {
                                $project: {
                                    _id: 0,
                                    username: 1,
                                    itemCount: 1,
                                    rank: { $add: ['$rank', 1] },
                                },
                            },
                        ],
                    }
                        : {}),
                },
            },
            {
                $project: {
                    leaderboard: '$leaderboard',
                    loggedInUser: { $arrayElemAt: ['$loggedInUser', 0] },
                },
            },
        ];

        try {
            const [result] = await catCountCollection
                .aggregate(pipeline)
                .toArray();

            let responseData = {
                category,
                totalEntries: result.leaderboard.length,
            };

            const leaderboardResponseArray = result.leaderboard.slice(
                startIndex,
                perPage + startIndex,
            );

            if (result.loggedInUser) {
                responseData = {
                    category,
                    username: result.loggedInUser.username,
                    userRank: result.loggedInUser.rank,
                    userItemCount: result.loggedInUser.itemCount,
                    leaderboard: leaderboardResponseArray,
                };
                // if there isnt a loggedInUser property, the user has no photos for that category
            } else if (userId) {
                const userInfo = await userCollection.findOne({
                    _id: userObjectId,
                });

                responseData = {
                    ...responseData,
                    username: userInfo.displayUsername,
                    userRank: -1,
                    userItemCount: 0,
                    leaderboard: leaderboardResponseArray,
                };
                // request was made by a user who is not logged in
            } else {
                responseData = {
                    ...responseData,
                    username: null,
                    userRank: null,
                    userItemCount: null,
                    leaderboard: leaderboardResponseArray,
                };
            }
            return responseData;
        } catch (error) {
            throw await errorHelpers.transformDatabaseError(
                error,
                __filename,
                'CategoryCount.getLeaderboardByCategory',
            );
        }
    },

    getLeaderboardByTotal: async ({ page, perPage, userId = null }) => {
        let includeLoggedInUserPipeline = false;
        if (userId) {
            includeLoggedInUserPipeline = true;
        }

        let userObjectId;
        if (typeof userId === 'string') {
            userObjectId = new ObjectId(userId);
        }
        const startIndex = (page - 1) * perPage;

        const sharedPipelineStages = [
            { $match: { totalUploads: { $gt: 0 } } },
            { $sort: { totalUploads: -1 } },
            {
                $project: {
                    itemCount: '$totalUploads',
                    username: '$displayUsername',
                    userId: 1,
                },
            },
            { $sort: { itemCount: -1 } },
            {
                $group: {
                    _id: null,
                    data: { $push: '$$ROOT' },
                },
            },
            {
                $unwind: {
                    path: '$data',
                    includeArrayIndex: 'data.rank',
                },
            },
            { $replaceRoot: { newRoot: '$data' } },
        ];
        const pipeline = [
            {
                $facet: {
                    leaderboard: [
                        ...sharedPipelineStages,
                        {
                            $project: {
                                _id: 0,
                                username: 1,
                                itemCount: 1,
                                rank: { $add: ['$rank', 1] },
                            },
                        },
                    ],
                    // prettier-ignore
                    ...(includeLoggedInUserPipeline
                        ? {
                            loggedInUser: [
                                ...sharedPipelineStages,
                                { $match: { userId: userObjectId } },
                                {
                                    $project: {
                                        _id: 0,
                                        username: 1,
                                        itemCount: 1,
                                        rank: { $add: ['$rank', 1] },
                                    },
                                },
                            ],
                        }
                        : {}),
                },
            },
            {
                $project: {
                    leaderboard: '$leaderboard',
                    loggedInUser: { $arrayElemAt: ['$loggedInUser', 0] },
                },
            },
        ];

        try {
            const [result] = await catCountCollection
                .aggregate(pipeline)
                .toArray();

            let responseData = {
                totalEntries: result.leaderboard.length,
            };

            const leaderboardResponseArray = result.leaderboard.slice(
                startIndex,
                perPage + startIndex,
            );

            if (result.loggedInUser) {
                responseData = {
                    ...responseData,
                    username: result.loggedInUser.username,
                    userRank: result.loggedInUser.rank,
                    userItemCount: result.loggedInUser.itemCount,
                    totalEntries: result.leaderboard.length,
                    leaderboard: leaderboardResponseArray,
                };
                // if there isnt a loggedInUser property, the user has no photos for that category
            } else if (userId) {
                const userInfo = await userCollection.findOne({
                    _id: userObjectId,
                });
                responseData = {
                    ...responseData,
                    username: userInfo.displayUsername,
                    userRank: -1,
                    userItemCount: 0,
                    leaderboard: leaderboardResponseArray,
                };
                // request was made by a user who is not logged in
            } else {
                responseData = {
                    ...responseData,
                    username: null,
                    userRank: null,
                    userItemCount: null,
                    leaderboard: leaderboardResponseArray,
                };
            }
            return responseData;
        } catch (error) {
            throw await errorHelpers.transformDatabaseError(
                error,
                __filename,
                'CategoryCount.getLeaderboardByTotal',
            );
        }
    },

    findByUserId: async (_id) => {
        let userId = _id;
        if (typeof userId === 'string') {
            userId = new ObjectId(userId);
        }
        try {
            const categoryCountDocument = await catCountCollection.findOne(
                { userId },
                {
                    projection: {
                        userId: 1,
                        displayUsername: 1,
                        username: 1,
                        pictureData: 1,
                        totalUploads: 1,
                    },
                },
            );
            return categoryCountDocument;
        } catch (error) {
            throw await errorHelpers.transformDatabaseError(
                error,
                __filename,
                'CategoryCount.findByUserId',
            );
        }
    },

    findByUsername: async (username) => {
        try {
            const categoryCountDocument = await catCountCollection.findOne(
                { username },
                {
                    projection: {
                        userId: 1,
                        displayUsername: 1,
                        username: 1,
                        pictureData: 1,
                        totalUploads: 1,
                    },
                },
            );
            return categoryCountDocument;
        } catch (error) {
            throw await errorHelpers.transformDatabaseError(
                error,
                __filename,
                'CategoryCount.findByUsername',
            );
        }
    },

    incrementCategoryByUserId: async (
        categoryString,
        userId,
        incrementAmount,
    ) => {
        if (typeof userId === 'string') {
            // eslint-disable-next-line no-param-reassign
            userId = new ObjectId(userId);
        }
        try {
            const categoryDocument = await catCountCollection.findOneAndUpdate(
                { userId },
                {
                    $inc: {
                        totalUploads: incrementAmount,
                        [`pictureData.${categoryString}`]: incrementAmount,
                    },
                },
                { returnDocument: 'after' },
            );
            return categoryDocument;
        } catch (error) {
            throw await errorHelpers.transformDatabaseError(
                error,
                __filename,
                'CategoryCount.incrementCategoryByUserId',
            );
        }
    },

    deleteUserInfo: async (userId) => {
        let userObjectId;
        if (typeof userId === 'string') {
            userObjectId = new ObjectId(userId);
        }
        try {
            const result = await catCountCollection.deleteOne({
                userId: userObjectId || userId,
            });
            return result.acknowledged;
        } catch (error) {
            error.statusCode = 500;
            throw error;
        }
    },
};

export default categoryCount;
