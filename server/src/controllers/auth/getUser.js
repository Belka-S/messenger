const { ctrlWrapper } = require('../../decorators');

const getUser = ctrlWrapper(async (req, res) => {
  const { user } = req;

  res.status(200).json({
    result: { user },
  });
});

module.exports = getUser;
