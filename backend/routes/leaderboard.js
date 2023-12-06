import express from 'express';
import controllers from '../controllers/index.js';
import extractUser from '../middleware/extractUser.js';

const leaderboardRoutes = express.Router();

leaderboardRoutes.get(
    '/',
    extractUser,
    controllers.leaderboard.getLeaderboardByTotal,
);

leaderboardRoutes.get(
    '/:category',
    extractUser,
    controllers.leaderboard.getLeaderboardByCategory,
);

export default leaderboardRoutes;
