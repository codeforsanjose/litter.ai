import express from 'express';

import controllers from '../controllers/index.js';
import isAuthAccess from '../middleware/is-auth-access-token.js';

const photoRoutes = express.Router();

photoRoutes.post('/', isAuthAccess, controllers.photoInfo.postPhoto);

photoRoutes.get(
    '/:username',
    isAuthAccess,
    controllers.photoInfo.getUserPhotoCount,
);

export default photoRoutes;
