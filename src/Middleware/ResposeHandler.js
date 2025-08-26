
function responseHandler(req, res, next) {
  res.success = function(code ,data, message ) {
    res.status(code).json({
      response: data,
      responseIndicator:"success",
      statusCode: code,
      responseMessage:message||"'Operation successful'"
    });
  };
  next();
}

module.exports = responseHandler;