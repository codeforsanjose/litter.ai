import express from 'express';

import isAuth from '../middleware/isAuth.js';

import controllers from '../controllers/index.js';

const authRoutes = express.Router();

authRoutes.post('/register', controllers.auth.postRegister);
authRoutes.post('/login', controllers.auth.postLogin);
authRoutes.post('/logout', isAuth, controllers.auth.postLogout);
authRoutes.get('/validate-token', isAuth, (req, res) => {
    res.json({ status: 'success', message: 'Token is valid.' });
});

export default authRoutes;
