const validation =
  (schema, property = 'body') =>
  (req, res, next) => {
    const { error } = schema.validate(req[property]);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');

      res.status(422).json({
        success: false,
        statusCode: 422,
        message,
      });
    }
  };
module.exports = validation;
