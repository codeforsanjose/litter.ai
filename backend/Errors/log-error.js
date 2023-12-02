/* eslint-disable no-underscore-dangle */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getCurrentDateFormatted = () => {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        '0',
    )}-${String(date.getDate()).padStart(2, '0')}`;
};

const logError = async (errorObject, filePath, functionName, context) => {
    const date = getCurrentDateFormatted();
    const errorLogPath = path.join(__dirname, 'logs', `${date}.json`);
    const newErrorInfo = {
        timestamp: new Date().toISOString(),
        functionName,
        filePath,
        context,
        message: errorObject.message,
        stack: errorObject.stack,
    };

    const logDirPath = path.join(__dirname, 'logs');
    // CHECK FOR logs FOLDER
    try {
        // attempt access to logs dir
        await fs.access(logDirPath);
    } catch (error) {
        // will throw an error if doesnt exist, so create here
        await fs.mkdir(logDirPath);
    }

    try {
        const rawData = await fs.readFile(errorLogPath, 'utf-8');
        const errorArray = JSON.parse(rawData);

        errorArray.push(newErrorInfo);

        await fs.writeFile(errorLogPath, JSON.stringify(errorArray, null, 2));
        console.log('Error logged successfully.');
    } catch (error) {
        if (error.code === 'ENOENT') {
            await fs.writeFile(
                errorLogPath,
                JSON.stringify([newErrorInfo], null, 2),
            );
            console.log('Error logged successfully, new log file created.');
        } else {
            console.error('Failed to log error:', error);
        }
    }
};

export default logError;
