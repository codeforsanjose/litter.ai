import { fileURLToPath } from 'url';
import errorHelpers from './helpers/errorHelpers.js';
import { getDb } from '../DB/db-connection.js';
import sanitizeId from './helpers/sanitizeId.js';

const __filename = fileURLToPath(import.meta.url);

const collName = 'categoryCounts';
const categoryCount = {
    create: async (userId, username, displayUsername, email) => {
        const userObjId = sanitizeId(userId);
        try {
            const payload = {
                userId: userObjId,
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
            const db = await getDb();
            const result = await db.collection(collName).insertOne(payload);

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
        let userObjectId;

        if (userId) {
            includeLoggedInUserPipeline = true;
            userObjectId = sanitizeId(userId);
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
            const db = await getDb();
            const [result] = await db
                .collection(collName)
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
                    ...responseData,
                    username: result.loggedInUser.username,
                    userRank: result.loggedInUser.rank,
                    userItemCount: result.loggedInUser.itemCount,
                    leaderboard: leaderboardResponseArray,
                };
                // if there isnt a loggedInUser property, the user has no photos for that category
            } else if (userId) {
                const userInfo = await db.collection('users').findOne({
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
        let userObjectId;
        if (userId) {
            includeLoggedInUserPipeline = true;
            userObjectId = sanitizeId(userId);
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
            const db = await getDb();
            const [result] = await db
                .collection(collName)
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
                const userInfo = await db.collection('users').findOne({
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
        const userId = sanitizeId(_id);
        try {
            const db = await getDb();
            const categoryCountDocument = await db.collection(collName).findOne(
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
            const db = await getDb();
            const categoryCountDocument = await db.collection(collName).findOne(
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
        const userObjId = sanitizeId(userId);

        try {
            const db = await getDb();
            const categoryDocument = await db
                .collection(collName)
                .findOneAndUpdate(
                    { userId: userObjId },
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
        const userObjId = sanitizeId(userId);
        try {
            const db = await getDb();
            const result = await db.collection(collName).deleteOne({
                userId: userObjId,
            });
            return result.acknowledged;
        } catch (error) {
            error.statusCode = 500;
            throw error;
        }
    },
};

export default categoryCount;
