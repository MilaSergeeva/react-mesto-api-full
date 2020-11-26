// errors/not-found-err.js

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    //а  если не 404????
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
