// const HttpError = require('../utils/HttpError');

const validateBody = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(422).json({
        error: error.name,
        message: error.details
          .map(err => {
            const cutIndex = err.message.indexOf('pattern');
            if (cutIndex !== -1) {
              err.message = err.message.substring(0, cutIndex + 7);
            }
            return `Body validation: ${err.message}`;
          })
          .join(', '),
      });
    }
    next();
  };
};

module.exports = validateBody;
