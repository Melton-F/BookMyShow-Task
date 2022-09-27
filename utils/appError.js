class AppError extends Error{
    constructor(message, statusCode){
        super(message)

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4')? 'Fail' : 'Error';
        this.operationalError = true;
        // console.log(this.operationalError);

        Error.captureStackTrace(this, this.constructor)
    }
}

// module.exports = AppError
module.exports = AppError