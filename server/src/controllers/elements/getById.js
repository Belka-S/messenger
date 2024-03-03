const { Elements } = require('../../db');
const { getDocById } = require('../../utils');
const { ctrlWrapper } = require('../../decorators');

const getById = ctrlWrapper(async (req, res) => {
  const { id } = req.params;

  const element = await getDocById(Elements, id);

  res.status(200).json({ message: 'Found', result: { element } });
});

module.exports = getById;
