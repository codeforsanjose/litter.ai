import express from 'express';

import isAuthAccess from '../middleware/is-auth-access-token.js';

import controllers from '../controllers/index.js';

const authRoutes = express.Router();

authRoutes.post('/register', controllers.auth.postRegister);
authRoutes.post('/login', controllers.auth.postLogin);
authRoutes.post('/logout', isAuthAccess, controllers.auth.postLogout);
authRoutes.get('/validate-token', isAuthAccess, (req, res) => {
    res.json({ status: 'success', message: 'Token is valid.' });
});

authRoutes.get('/refresh-token', controllers.auth.getRefreshToken);

export default authRoutes;
