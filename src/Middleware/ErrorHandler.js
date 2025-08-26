
function errorHandler(err, req, res, next) {
  console.error(err.stack); 

  const code = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(code).json({
      response: null,
      responseIndicator:"failed",
      statusCode: code,
      responseMessage:message||"'Operation successful'"
  });
}
module.exports = errorHandler;