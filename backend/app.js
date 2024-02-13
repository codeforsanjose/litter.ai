import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cron from 'node-cron';
import cors from 'cors';
import { fileURLToPath } from 'url';

import { getDb, mongoConnect } from './DB/db-connection.js';
import routes from './routes/index.js';
import logError from './Errors/log-error.js';
import errorHandler from './middleware/errorHandler.js';
import refreshTokenModel from './models/RefreshToken.js';

const app = express();

const {
    REFRESH_SECRET,
    ACCESS_SECRET,
    MONGO_URI,
    SERVER_PORT,
    NODE_ENV,
    LOCAL_HTTPS,
} = process.env;

const __filename = fileURLToPath(import.meta.url);

const PORT = SERVER_PORT || 3001;

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
        if (NODE_ENV === 'dev') {
            app.use(
                cors({ origin: 'https://localhost:3000', credentials: true }),
            );
        } else {
            const corsOptions = {
                // eslint-disable-next-line object-shorthand, func-names
                origin: function (origin, callback) {
                    if (!origin) return callback(null, true);
                    return callback(null, origin);
                },
                credentials: true, // Allow cookies to be sent
            };

            app.use(cors(corsOptions));
        }
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
        if (LOCAL_HTTPS === 'true') {
            // Import HTTPS and FS modules only in 'dev' mode
            const https = await import('https');
            const fs = await import('fs');

            const httpsOptions = {
                key: fs.readFileSync('server.key'),
                cert: fs.readFileSync('server.crt'),
            };

            https.createServer(httpsOptions, app).listen(PORT, () => {
                console.log(
                    `HTTPS Server running in development mode on port: ${PORT}\nConnected to db: ${db.databaseName}`,
                );
            });
        } else if (NODE_ENV !== 'test') {
            app.listen(PORT, () => {
                console.log(
                    `HTTP Server started on port: ${PORT}\nConnected to db: ${db.databaseName}`,
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
