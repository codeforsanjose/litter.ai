import { fileURLToPath } from 'url';
import { ObjectId } from 'mongodb';
import { getCatCountCollection } from '../DB/collections.js';
import errorHelpers from './helpers/errorHelpers.js';

const __filename = fileURLToPath(import.meta.url);
/**
 * @type {import('mongodb').Collection}
 */
let catCountCollection =
    process.env.NODE_ENV !== 'test' && getCatCountCollection;

const CategoryCount = {
    injectDB: (db) => {
        if (process.env.NODE_ENV === 'test') {
            catCountCollection = db.collection('categoryCounts');
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
            };
            if (result.loggedInUser) {
                responseData = {
                    ...responseData,
                    userRank: result.loggedInUser.rank,
                    totalEntries: result.leaderboard.length,
                    leaderboard: result.leaderboard.slice(
                        startIndex,
                        perPage + startIndex,
                    ),
                };
                // if there isnt a loggedInUser property, the user has no photos for that category
            } else if (userId) {
                responseData = {
                    ...responseData,
                    userRank: -1,
                    totalEntries: result.leaderboard.length,
                    leaderboard: result.leaderboard.slice(
                        startIndex,
                        perPage + startIndex,
                    ),
                };
                // request was made by a user who is not logged in
            } else {
                responseData = {
                    ...responseData,
                    userRank: null,
                    totalEntries: result.leaderboard.length,
                    leaderboard: result.leaderboard.slice(
                        startIndex,
                        perPage + startIndex,
                    ),
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

        console.log(includeLoggedInUserPipeline);
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

            let responseData;
            if (result.loggedInUser) {
                responseData = {
                    userRank: result.loggedInUser.rank,
                    totalEntries: result.leaderboard.length,
                    leaderboard: result.leaderboard.slice(
                        startIndex,
                        perPage + startIndex,
                    ),
                };
                // if there isnt a loggedInUser property, the user has no photos for that category
            } else if (userId) {
                responseData = {
                    userRank: -1,
                    totalEntries: result.leaderboard.length,
                    leaderboard: result.leaderboard.slice(
                        startIndex,
                        perPage + startIndex,
                    ),
                };
                // request was made by a user who is not logged in
            } else {
                responseData = {
                    userRank: null,
                    totalEntries: result.leaderboard.length,
                    leaderboard: result.leaderboard.slice(
                        startIndex,
                        perPage + startIndex,
                    ),
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

export default CategoryCount;
