const errorHandler = (error, req, res, next) => {
    console.error('Error:', error);

    const statusCode = error.statusCode || 500;

    const message =
        statusCode === 500 ? 'Internal Service Error' : error.message;

    // Send a consistent error structure
    return res.status(statusCode).json({
        status: 'error',
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
    });
};

export default errorHandler;
