import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cron from 'node-cron';
import { fileURLToPath } from 'url';
import cors from 'cors';

import { getDb, mongoConnect } from './DB/db-connection.js';
import routes from './routes/index.js';
import logError from './Errors/log-error.js';
// import isAuth from './middleware/isAuth.js';
import errorHandler from './middleware/errorHandler.js';
import refreshTokenModel from './models/RefreshToken.js';

const app = express();

const { REFRESH_SECRET, ACCESS_SECRET, MONGO_URI, SERVER_PORT, NODE_ENV } =
    process.env;

const __filename = fileURLToPath(import.meta.url);

const PORT = SERVER_PORT || 3000;

const startServer = async () => {
    try {
        await mongoConnect();
        const db = await getDb();
        cron.schedule('0 * * * *', async () => {
            try {
                const { acknowledged, deletedCount } =
                    await refreshTokenModel.removeExpDocs();
                if (acknowledged) {
                    console.log(
                        `${new Date()}: Removed ${deletedCount} expired refreshToken documents.`,
                    );
                } else {
                    console.log(
                        `${new Date()}: removeExpDocs query was not acknowledged`,
                    );
                }
            } catch (error) {
                console.log(error);
            }
        });

        app.use(cors());
        app.use(morgan('dev'));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cookieParser());

        app.use((req, res, next) => {
            if (!REFRESH_SECRET || !MONGO_URI || !ACCESS_SECRET) {
                return res.status(500).send({
                    message: 'Internal Service Error',
                    error: 'Server missing Database Connection String or Secret',
                });
            }
            return next();
        });

        // Routes
        app.use('/', routes.auth);
        app.use('/leaderboard', routes.leaderboard);
        // app.use(isAuth);
        app.use('/photo', routes.photo);

        app.use(errorHandler);

        if (NODE_ENV !== 'test') {
            app.listen(PORT, () => {
                console.log(
                    `Server started on port: ${PORT}\nConnected to db: ${db.databaseName}`,
                );
            });
        }
    } catch (error) {
        await logError(error, __filename, 'startServer');
        console.log(error);
    }
};

startServer();

export default app;
