function errorHandler(error, req, res, next) {
  console.error(error.stack);
  return { status: 500, data: { message: error.message } };
}

module.exports = { errorHandler };
