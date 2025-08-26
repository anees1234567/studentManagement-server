class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404; 
    Error.captureStackTrace(this, this.constructor); 
  }
}

class TokenError extends Error {
    constructor(message) {
        super(message);
        this.name = 'TokenError';
        this.statusCode = 401; 
        Error.captureStackTrace(this, this.constructor); 
    }
}



module.exports = { NotFoundError,TokenError }