/* eslint-disable no-param-reassign */
import logError from '../../Errors/log-error.js';

const errorHelpers = {
    transformDatabaseError: async (error, __filename, functionName) => {
        logError(error, __filename, functionName);
        error.message = `Database operation failed: ${error.message}`;
        error.statusCode = 500;
        return error;
    },
};

export default errorHelpers;
