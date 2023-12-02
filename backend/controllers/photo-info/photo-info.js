import { fileURLToPath } from 'url';

import {
    getUserPhotoCountParamSchema,
    postPhotoBodySchema,
} from './photo-info-req-schemas.js';
import CategoryCount from '../../models/CategoryCount.js';
import PhotoInfo from '../../models/PhotoInfo.js';
import logError from '../../Errors/log-error.js';

const __filename = fileURLToPath(import.meta.url);

const photoInfoController = {
    getUserPhotoCount: async (req, res, next) => {
        const { userId } = req.params;

        try {
            const { error } = getUserPhotoCountParamSchema.validate({ userId });
            if (error) {
                return res.status(422).send({
                    message: 'Validation Error',
                    error: error.details[0].message,
                });
            }

            const userCategoryCountDoc =
                await CategoryCount.findByUserId(userId);

            if (!userCategoryCountDoc) {
                return res.status(404).send({ message: 'User not found.' });
            }

            return res.status(200).send(userCategoryCountDoc);
        } catch (error) {
            logError(error, __filename, 'getPhotoCount');
            return next(error);
        }
    },

    postPhoto: async (req, res, next) => {
        let { category, email } = req.body;
        category = category.toLowerCase().trim();
        email = email.toLowerCase().trim();
        try {
            const { error } = postPhotoBodySchema.validate(req.body);
            if (error) {
                return res.status(422).send({
                    message: 'Validation Error',
                    error: error.details[0].message,
                });
            }
            if (email !== req.user.email) {
                return res.status(401).send({ message: 'Invalid email.' });
            }

            const result = await PhotoInfo.insertOne(category, req.user);

            return res.status(201).send(result);
        } catch (error) {
            return next(error);
        }
    },
};

export default photoInfoController;
