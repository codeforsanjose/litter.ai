import express from 'express';

import controllers from '../controllers/index.js';
import isAuth from '../middleware/isAuth.js';

const photoRoutes = express.Router();

photoRoutes.post('/', isAuth, controllers.photoInfo.postPhoto);

photoRoutes.get('/:username', isAuth, controllers.photoInfo.getUserPhotoCount);

export default photoRoutes;
