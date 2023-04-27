function errorHandler(error, req, res, next) {
  console.error(error.stack);
  const status = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  //res.status(status).json({ message });
  //return { status: status, data: { message: message } };
  res.status(status).json({ message });

  //res.status(500).json({ message: error.message });
}

module.exports = { errorHandler };
