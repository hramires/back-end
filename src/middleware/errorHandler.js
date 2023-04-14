function errorHandler(err, req, res, next) {
  console.error(err.stack);
  return { status: 500, data: { message: error.message } };
}

module.exports = { errorHandler };
